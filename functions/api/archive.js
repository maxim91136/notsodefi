// Archives current KV metrics to R2
// Call daily via external cron (cron-job.org) or manually
// Structure: /{project}/{YYYY-MM-DD}.json

export async function onRequest(context) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  const KV = context.env?.METRICS_KV;
  const R2 = context.env?.HISTORY_R2;

  if (!KV) {
    return new Response(JSON.stringify({ error: 'KV not bound' }), {
      status: 500, headers: cors
    });
  }

  if (!R2) {
    return new Response(JSON.stringify({ error: 'R2 not bound' }), {
      status: 500, headers: cors
    });
  }

  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const list = await KV.list({ prefix: 'metrics:' });
    const archived = [];

    for (const key of list.keys) {
      const project = key.name.replace('metrics:', '');
      const data = await KV.get(key.name, { type: 'json' });

      if (data) {
        const r2Key = `${project}/${today}.json`;
        await R2.put(r2Key, JSON.stringify(data), {
          httpMetadata: { contentType: 'application/json' }
        });
        archived.push(r2Key);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      date: today,
      archived: archived.length,
      keys: archived
    }), { status: 200, headers: cors });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: cors
    });
  }
}
