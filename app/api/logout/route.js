export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", "mc_user=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
  response.headers.append("Set-Cookie", "mc_instagram_token=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0");
  return response;
}
