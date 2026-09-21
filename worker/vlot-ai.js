const json = (body, status = 200, origin = '') => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': origin,
    'vary': 'Origin',
    'cache-control': 'no-store'
  }
});

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '';
    if (!allowed || origin !== allowed) return json({ error: 'Origin not allowed' }, 403, allowed);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: {
      'access-control-allow-origin': allowed,
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'access-control-max-age': '86400'
    }});
    if (request.method !== 'POST') return json({ error: 'POST required' }, 405, allowed);

    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const hour = new Date().toISOString().slice(0, 13);
    const rateKey = `${hour}:${ip}`;
    const used = Number(await env.VLOT_RATE.get(rateKey) || 0);
    if (used >= 30) return json({ error: 'Hourly limit reached' }, 429, allowed);
    await env.VLOT_RATE.put(rateKey, String(used + 1), { expirationTtl: 3700 });

    let body;
    try { body = await request.json(); } catch { return json({ error: 'Invalid JSON' }, 400, allowed); }
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt || prompt.length > 20000) return json({ error: 'Prompt must contain 1–20,000 characters' }, 400, allowed);

    const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.55 }
      })
    });
    const data = await upstream.json();
    if (!upstream.ok) return json({ error: data.error?.message || `Provider error ${upstream.status}` }, upstream.status, allowed);
    const text = (data.candidates?.[0]?.content?.parts || []).map(part => part.text || '').join('');
    return json({ text }, 200, allowed);
  }
};
