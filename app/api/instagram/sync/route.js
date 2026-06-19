export async function POST(request) {
  const token = request.headers.get("cookie")?.match(/mc_instagram_token=([^;]+)/)?.[1];

  if (!token) {
    return Response.json(
      { error: "Instagram ainda não conectado. Use OAuth oficial ou importe Insights CSV/JSON." },
      { status: 401 }
    );
  }

  return Response.json({
    ok: true,
    profile: {
      username: "perfil_conectado",
      followers: null,
      media_count: null
    },
    message: "Conexão localizada. Para métricas completas, configure permissões aprovadas no app da Meta."
  });
}
