export async function GET() {
  const clientId = process.env.META_INSTAGRAM_CLIENT_ID;
  const redirectUri = process.env.META_INSTAGRAM_REDIRECT_URI;
  const scope = process.env.META_INSTAGRAM_SCOPES || "instagram_business_basic,instagram_business_manage_insights";

  if (!clientId || !redirectUri) {
    return Response.redirect(new URL("/?instagram_oauth=missing_config", "https://creatorpro-seven.vercel.app"));
  }

  const authUrl = new URL("https://www.instagram.com/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", scope);

  return Response.redirect(authUrl);
}
