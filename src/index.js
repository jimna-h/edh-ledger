export default {
  async fetch(request) {
    const target = new URL(request.url).searchParams.get('url');
    if (!target || !target.startsWith('https://archidekt.com/')) {
      return new Response('Only archidekt.com is allowed', { status: 400 });
    }
    const upstream = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
