export async function GET(request) {
  const oauthConfigured = Boolean(
    process.env.META_INSTAGRAM_CLIENT_ID &&
    process.env.META_INSTAGRAM_CLIENT_SECRET &&
    process.env.META_INSTAGRAM_REDIRECT_URI
  );
  const connected = Boolean(request.headers.get("cookie")?.match(/mc_instagram_token=([^;]+)/));

  return Response.json({
    connected,
    oauth_configured: oauthConfigured,
    mode: connected ? "connected" : oauthConfigured ? "official-ready" : "configuration-required"
  });
}
