export async function GET(request) {
  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/mc_user=([^;]+)/);

  if (!match) {
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    return Response.json({ user: JSON.parse(decodeURIComponent(match[1])) });
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}
