export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", "mc_user=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  response.headers.append("Set-Cookie", "mc_instagram_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  return response;
}
