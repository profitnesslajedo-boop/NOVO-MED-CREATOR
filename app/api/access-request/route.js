export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const required = ["name", "email", "whatsapp", "crm", "specialty"];
  const missing = required.filter((field) => !String(body[field] || "").trim());

  if (missing.length) {
    return Response.json({ error: `Campos obrigatórios ausentes: ${missing.join(", ")}.` }, { status: 400 });
  }

  const lead = {
    name: body.name,
    email: body.email,
    whatsapp: body.whatsapp,
    crm: body.crm,
    specialty: body.specialty,
    status: "pending",
    requested_at: new Date().toISOString()
  };

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  let saved = false;

  if (supabaseUrl && serviceKey) {
    const response = await fetch(`${supabaseUrl}/rest/v1/access_requests`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(lead)
    });
    saved = response.ok;
  }

  return Response.json({
    ok: true,
    status: "pending",
    saved,
    notification_sent: false,
    message: "Cadastro recebido para análise e liberação individual.",
    lead
  });
}
