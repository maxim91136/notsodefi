// Read historical metrics from R2
// GET /api/history?project=bitcoin&date=2025-01-15
// GET /api/history?project=bitcoin (lists available dates)

export async function onRequest(context) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600'
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
  const project = url.searchParams.get('project');
  const date = url.searchParams.get('date');

  if (!project) {
    return new Response(JSON.stringify({ error: 'Missing project parameter' }), {
      status: 400, headers: cors
    });
  }

  try {
    // If date provided, return specific snapshot
    if (date) {
      const key = `${project}/${date}.json`;
      const obj = await R2.get(key);

      if (!obj) {
        return new Response(JSON.stringify({ error: 'Snapshot not found', project, date }), {
          status: 404, headers: cors
        });
      }

      const data = await obj.json();
      return new Response(JSON.stringify(data), { status: 200, headers: cors });
    }

    // No date: list available snapshots for project
    const list = await R2.list({ prefix: `${project}/` });
    const dates = list.objects
      .map(obj => obj.key.replace(`${project}/`, '').replace('.json', ''))
      .sort()
      .reverse();

    return new Response(JSON.stringify({
      project,
      count: dates.length,
      dates
    }), { status: 200, headers: cors });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: cors
    });
  }
}
