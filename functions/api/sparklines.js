// Batch endpoint for sparkline data
// GET /api/sparklines - Returns last 7 days of totalScore for all projects
// GET /api/sparklines?projects=bitcoin,ethereum - Returns specific projects

export async function onRequest(context) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300' // 5 min cache
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  const R2 = context.env?.HISTORY_R2;
  if (!R2) {
    return new Response(JSON.stringify({ error: 'R2 not bound' }), {
      status: 500, headers: cors
    });
  }

  const url = new URL(context.request.url);
  const projectsParam = url.searchParams.get('projects');

  try {
    // Generate last 7 dates
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toISOString().split('T')[0]);
    }

    // If specific projects requested, use those; otherwise list all from R2
    let projectIds = [];

    if (projectsParam) {
      projectIds = projectsParam.split(',').map(p => p.trim()).filter(Boolean);
    } else {
      // List all project prefixes from R2
      const list = await R2.list({ delimiter: '/' });
      projectIds = list.delimitedPrefixes
        .map(prefix => prefix.replace('/', ''))
        .filter(Boolean);
    }

    // Fetch all data in parallel
    const results = {};

    const fetchPromises = projectIds.map(async (projectId) => {
      const scores = [];

      // Fetch all 7 dates in parallel for this project
      const datePromises = dates.map(async (date) => {
        try {
          const key = `${projectId}/${date}.json`;
          const obj = await R2.get(key);
          if (obj) {
            const data = await obj.json();
            return { date, score: data.totalScore };
          }
        } catch {
          // Ignore individual fetch errors
        }
        return null;
      });

      const dateResults = await Promise.all(datePromises);

      // Collect scores in order
      for (const result of dateResults) {
        if (result && typeof result.score === 'number') {
          scores.push(result.score);
        }
      }

      if (scores.length >= 2) {
        results[projectId] = scores;
      }
    });

    await Promise.all(fetchPromises);

    return new Response(JSON.stringify({
      dates,
      projects: results,
      count: Object.keys(results).length
    }), { status: 200, headers: cors });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: cors
    });
  }
}
