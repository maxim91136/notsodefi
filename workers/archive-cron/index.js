// Scheduled worker: Archives KV metrics to R2 daily
// Runs automatically via Cloudflare Cron Trigger

export default {
  async scheduled(event, env, ctx) {
    const today = new Date().toISOString().split('T')[0];
    const list = await env.METRICS_KV.list({ prefix: 'metrics:' });

    for (const key of list.keys) {
      const project = key.name.replace('metrics:', '');
      const data = await env.METRICS_KV.get(key.name, { type: 'json' });

      if (data) {
        const r2Key = `${project}/${today}.json`;
        await env.HISTORY_R2.put(r2Key, JSON.stringify(data), {
          httpMetadata: { contentType: 'application/json' }
        });
      }
    }

    console.log(`Archived ${list.keys.length} projects for ${today}`);
  }
};
