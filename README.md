# MedCreator Pro

Plataforma premium para médicos criarem conteúdo estratégico, organizarem calendário editorial, acessarem uma biblioteca por especialidade e analisarem o Instagram com IA, dados importados e integração oficial via Meta.

## Stack

- Next.js App Router
- React
- API Routes server-side na Vercel
- Supabase REST com `service_role` apenas no servidor
- OpenAI Responses API para geração de roteiros e análises
- Instagram OAuth via Meta para perfis profissionais autorizados

## Funcionalidades principais

- Landing page comercial premium, responsiva e pronta para apresentação a médicos.
- Área do Médico com login por e-mail e senha liberados após pagamento.
- Criador IA de roteiros, posts, stories e CTAs por especialidade.
- Biblioteca secreta com ganchos, temas, roteiros, CTAs e prompts.
- Planejamento editorial com status, horário, anexos, edição, exclusão e exportação.
- Instagram Pro com conexão OAuth, importação de Insights, diagnóstico por prints e recomendações.
- Central do CRM com orientação ética, CRM/RQE e dúvidas comuns de comunicação médica.

## Rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env.local` na raiz do projeto usando `.env.example` como base.

3. Rode em desenvolvimento:

```bash
npm run dev
```

4. Abra:

```text
http://localhost:3000
```

## Build e preview local

```bash
npm run build
npm run preview
```

Por padrão, `npm run preview` usa o `next start`. Se quiser outra porta:

```bash
npm run preview -- -p 4173
```

## Variáveis de ambiente necessárias na Vercel

Configure em:

`Vercel > Project > Settings > Environment Variables`

Obrigatórias para produção:

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
ENABLE_DEMO_LOGIN=false
```

Necessárias para Instagram OAuth oficial:

```env
META_INSTAGRAM_CLIENT_ID=
META_INSTAGRAM_CLIENT_SECRET=
META_INSTAGRAM_REDIRECT_URI=https://SEU_DOMINIO/api/instagram/oauth/callback
META_INSTAGRAM_SCOPES=instagram_business_basic,instagram_business_manage_insights
META_INSTAGRAM_WEBHOOK_VERIFY_TOKEN=
```

Opcionais para automações de cadastro:

```env
ACCESS_REQUEST_NOTIFY_EMAIL=marcosestevees@icloud.com
ACCESS_REQUEST_WHATSAPP=5511924787933
WHATSAPP_CLOUD_ACCESS_TOKEN=
WHATSAPP_CLOUD_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TEMPLATE=novo_cadastro_med_creator
WHATSAPP_ACCESS_TEMPLATE_LANGUAGE=pt_BR
```

## Supabase

1. Crie um projeto no Supabase.
2. Abra `SQL Editor`.
3. Rode o conteúdo de `supabase-schema.sql`.
4. Copie:
   - `Project URL` para `SUPABASE_URL`
   - `service_role key` para `SUPABASE_SERVICE_ROLE_KEY`
5. Configure essas variáveis na Vercel.

### Tabelas usadas

- `access_requests`: cadastros e solicitações.
- `platform_users`: usuários liberados após pagamento.
- `ai_usage`: histórico futuro de consumo de IA.
- `instagram_imports`: importações de Insights.

### Criar um acesso de teste

No Supabase, adicione uma linha em `platform_users`:

| name | email | access_password | specialty | crm | plan | status |
|---|---|---|---|---|---|---|
| Dr. Felipe Almeida | medico@medcreatorpro.com | MedPro2026! | Dermatologia | CRM/SP 123456 | Creator Pro | active |

O projeto também mantém esse mesmo acesso como fallback quando o Supabase ainda não está configurado.
Em produção, mantenha `ENABLE_DEMO_LOGIN=false`. Para testes temporários em preview, ative `ENABLE_DEMO_LOGIN=true` apenas se souber que esse acesso provisório poderá entrar.

## Deploy na Vercel

1. Suba o projeto para o GitHub.
2. Na Vercel, clique em `Add New > Project`.
3. Importe o repositório.
4. Framework Preset: `Next.js`.
5. Build Command: `npm run build`.
6. Output Directory: deixe vazio.
7. Configure todas as variáveis de ambiente.
8. Clique em `Deploy`.
9. Depois do deploy, teste:
   - Página inicial.
   - Área do Médico.
   - Login de teste.
   - Criador IA.
   - Instagram Pro.
   - Links legais.

## GitHub

Arquivos que devem ir para o GitHub:

- `app/`
- `public/`
- `brand/`
- `index.html`
- `package.json`
- `package-lock.json`
- `vercel.json`
- `supabase-schema.sql`
- `.env.example`
- `.gitignore`
- `README.md`
- páginas legais HTML

Não envie:

- `.env`
- `.env.local`
- `.next/`
- `node_modules/`
- arquivos `.zip`
- logs
- bancos locais

## Segurança

- Nunca coloque `OPENAI_API_KEY` no HTML ou no navegador.
- Nunca publique `SUPABASE_SERVICE_ROLE_KEY`.
- A `service_role key` só pode existir em variáveis privadas da Vercel.
- O Instagram OAuth deve usar HTTPS e callback exatamente igual ao configurado na Meta.
- Não envie dados identificáveis de pacientes para análise sem base legal e salvaguardas adequadas.

## Observações de produção

- A versão completa deve rodar na Vercel ou ambiente equivalente com serverless/API routes.
- Hospedagem estática comum não executa IA, login server-side, Supabase server-side nem OAuth.
- Após alterar variáveis de ambiente na Vercel, faça novo deploy.
