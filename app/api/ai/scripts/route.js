function fallbackBlocks(payload) {
  const theme = payload.theme || "tema médico estratégico";
  const specialty = payload.specialty || "Medicina";
  const format = payload.format || "Roteiro";
  const tone = payload.tone || "profissional";

  return {
    title: "Roteiro médico gerado pela IA",
    subtitle: `${format} - ${specialty} - ${tone}`,
    blocks: [
      { label: "Objetivo estratégico", text: `Criar um conteúdo sobre ${theme} para gerar autoridade, conexão e intenção de conversa qualificada em ${specialty}.` },
      { label: "Gancho inicial", text: `"${theme}: o que o paciente precisa entender antes de tomar uma decisão."` },
      { label: "Contexto médico", text: "Explique o tema com linguagem simples, deixando claro que cada caso exige avaliação individual." },
      { label: "Como gravar", text: "Use plano médio, luz frontal, áudio limpo, texto grande na tela e cortes curtos a cada ideia importante." },
      { label: "CTA ético", text: "Convide para salvar, enviar dúvida geral ou agendar avaliação, sem promessa de resultado." }
    ]
  };
}

function normalizeAiJson(text, payload) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed.blocks)) return parsed;
  } catch {}
  return fallbackBlocks(payload);
}

export async function POST(request) {
  const payload = await request.json().catch(() => ({}));
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    return Response.json({ error: "OPENAI_API_KEY não configurada." }, { status: 503 });
  }

  const prompt = `
Você é uma IA especialista em conteúdo médico estratégico para Instagram.
Crie um roteiro completo em português do Brasil, específico para:
- Tema: ${payload.theme || "tema médico"}
- Especialidade: ${payload.specialty || "medicina"}
- Formato: ${payload.format || "roteiro"}
- Tom: ${payload.tone || "profissional"}
- Observações: ${payload.notes || "sem observações"}

Regras:
- Não prometa resultado.
- Não faça diagnóstico individual.
- Inclua alerta ético/CRM quando fizer sentido.
- Explique como gravar, gancho visual, roteiro de fala, CTA e objetivo de venda ética.
- Responda SOMENTE JSON válido neste formato:
{"title":"...","subtitle":"...","blocks":[{"label":"Objetivo estratégico","text":"..."},{"label":"Gancho visual","text":"..."},{"label":"Como gravar","text":"..."},{"label":"Roteiro de fala","text":"..."},{"label":"CTA ético","text":"..."}]}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        input: prompt,
        temperature: 0.7
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return Response.json({ error: data.error?.message || "Erro ao gerar roteiro com IA." }, { status: 502 });
    }

    const text = data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("\n") || "";
    return Response.json(normalizeAiJson(text, payload));
  } catch {
    return Response.json({ error: "Falha temporária ao conectar com a IA." }, { status: 502 });
  }
}
