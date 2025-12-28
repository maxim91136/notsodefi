// Scheduled worker: Archives KV metrics to R2 daily
// Runs automatically via Cloudflare Cron Trigger

async function archive(env) {
  const today = new Date().toISOString().split('T')[0];
  const list = await env.METRICS_KV.list({ prefix: 'metrics:' });
  const archived = [];

  for (const key of list.keys) {
    const project = key.name.replace('metrics:', '');
    const data = await env.METRICS_KV.get(key.name, { type: 'json' });

    if (data) {
      const r2Key = `${project}/${today}.json`;
      await env.HISTORY_R2.put(r2Key, JSON.stringify(data), {
        httpMetadata: { contentType: 'application/json' }
      });
      archived.push(r2Key);
    }
  }

  return { date: today, count: archived.length, keys: archived };
}

const archiveWorker = {
  // Cron trigger
  async scheduled(_event, env, _ctx) {
    const result = await archive(env);
    console.log(`Archived ${result.count} projects for ${result.date}`);
  },

  // HTTP trigger for testing
  async fetch(request, env) {
    const result = await archive(env);
    return new Response(JSON.stringify(result, null, 2), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export default archiveWorker;
