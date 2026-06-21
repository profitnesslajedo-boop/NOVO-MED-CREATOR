function cookieValue(value) {
  return encodeURIComponent(JSON.stringify(value));
}

function cookieOptions(request) {
  const url = new URL(request.url);
  const secure = url.protocol === "https:" ? "; Secure" : "";
  return `Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=2592000`;
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.username || body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const demoLoginEnabled = process.env.NODE_ENV !== "production" || process.env.ENABLE_DEMO_LOGIN === "true";
  const demoCredentials = email === "medico@medcreatorpro.com" && password === "MedPro2026!";
  let user = null;

  if (demoLoginEnabled && demoCredentials) {
    user = {
      name: "Dr. Felipe Almeida",
      email: "medico@medcreatorpro.com",
      specialty: "Dermatologia",
      crm: "CRM/SP 123456",
      plan: "Creator Pro"
    };
  }

  if (!user && supabaseUrl && serviceKey) {
    const params = new URLSearchParams({
      select: "name,email,specialty,crm,plan,status",
      email: `eq.${email}`,
      access_password: `eq.${password}`,
      limit: "1"
    });
    const response = await fetch(`${supabaseUrl}/rest/v1/platform_users?${params.toString()}`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`
      }
    });
    const rows = response.ok ? await response.json() : [];
    const found = Array.isArray(rows) ? rows[0] : null;
    if (!found || found.status === "blocked") {
      return Response.json({ error: "Acesso não encontrado ou ainda não liberado." }, { status: 401 });
    }
    user = {
      name: found.name,
      email: found.email,
      specialty: found.specialty,
      crm: found.crm,
      plan: found.plan || "Creator Pro"
    };
  }

  if (!user) {
    return Response.json({ error: "Acesso não liberado. Confira e-mail e senha recebidos após o pagamento." }, { status: 401 });
  }

  const response = Response.json({ ok: true, user });
  response.headers.append(
    "Set-Cookie",
    `mc_user=${cookieValue(user)}; ${cookieOptions(request)}`
  );
  return response;
}
