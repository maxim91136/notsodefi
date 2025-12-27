export async function onRequest(context) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=60, s-maxage=300'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }

  const KV = context.env?.METRICS_KV;
  if (!KV) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), {
      status: 500,
      headers: cors
    });
  }

  try {
    // List all keys with prefix metrics:
    const list = await KV.list({ prefix: 'metrics:' });
    const results = {};

    // Fetch all values in parallel
    const promises = list.keys.map(async (key) => {
      const project = key.name.replace('metrics:', '');
      const data = await KV.get(key.name, { type: 'json' });
      return { project, data };
    });

    const entries = await Promise.all(promises);
    for (const { project, data } of entries) {
      if (data) {
        results[project] = data;
      }
    }

    return new Response(JSON.stringify({
      count: Object.keys(results).length,
      metrics: results
    }), { status: 200, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch metrics', details: e.message }), {
      status: 500,
      headers: cors
    });
  }
}
