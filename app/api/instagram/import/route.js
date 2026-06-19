export async function GET() {
  return Response.json({ rows: [] });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const rows = Array.isArray(body.rows) ? body.rows : [];

  return Response.json({
    ok: true,
    rows,
    count: rows.length,
    message: "Insights recebidos para análise do perfil médico."
  });
}
