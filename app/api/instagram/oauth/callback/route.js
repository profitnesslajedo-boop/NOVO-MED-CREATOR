export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error || !code) {
    return Response.redirect(new URL("/?instagram_oauth=cancelled", url.origin));
  }

  const clientId = process.env.META_INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.META_INSTAGRAM_CLIENT_SECRET;
  const redirectUri = process.env.META_INSTAGRAM_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return Response.redirect(new URL("/?instagram_oauth=missing_config", url.origin));
  }

  try {
    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code
      })
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      return Response.redirect(new URL("/?instagram_oauth=token_error", url.origin));
    }

    const response = Response.redirect(new URL("/?instagram_oauth=connected", url.origin));
    response.headers.append(
      "Set-Cookie",
      `mc_instagram_token=${encodeURIComponent(tokenData.access_token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`
    );
    return response;
  } catch {
    return Response.redirect(new URL("/?instagram_oauth=network_error", url.origin));
  }
}
