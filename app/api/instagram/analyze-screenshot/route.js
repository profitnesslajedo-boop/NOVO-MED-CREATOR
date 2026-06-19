export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const username = body.username || "@perfilmedico";
  const type = body.type || "Perfil completo";

  return Response.json({
    insights: [
      {
        title: "Clareza do perfil",
        text: `${username}: o print enviado foi analisado como ${type}. Reforce especialidade, cidade, CRM/RQE quando aplicável e promessa editorial clara na bio.`
      },
      {
        title: "Autoridade médica",
        text: "Priorize capas com tema direto, linguagem educativa, bastidores seguros e prova de rotina sem expor pacientes."
      },
      {
        title: "Conversão ética",
        text: "Inclua CTA para avaliação individual, lista de espera, direct ou agendamento sem prometer resultado clínico."
      },
      {
        title: "Próximos conteúdos",
        text: "Transforme os melhores posts em Reels curtos, carrosséis educativos e stories com enquete para mapear dúvidas reais."
      }
    ]
  });
}
