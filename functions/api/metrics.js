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

  const url = new URL(context.request.url);
  const project = url.searchParams.get('project');

  if (!project) {
    return new Response(JSON.stringify({ error: 'Missing project parameter' }), {
      status: 400,
      headers: cors
    });
  }

  const KV = context.env?.METRICS_KV;
  if (!KV) {
    return new Response(JSON.stringify({ error: 'KV not configured' }), {
      status: 500,
      headers: cors
    });
  }

  try {
    const key = `metrics:${project}`;
    const data = await KV.get(key, { type: 'json' });

    if (!data) {
      return new Response(JSON.stringify({ error: 'Project not found', project }), {
        status: 404,
        headers: cors
      });
    }

    return new Response(JSON.stringify(data), { status: 200, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Failed to fetch metrics', details: e.message }), {
      status: 500,
      headers: cors
    });
  }
}
