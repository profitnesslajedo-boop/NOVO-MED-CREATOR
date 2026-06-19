# Med Creator PRO

Primeira versão full-stack da plataforma para médicos criadores.

## Recursos implementados

- Login individual com sessão segura e senha armazenada com PBKDF2.
- Banco SQLite local (`med_creator.db`) criado automaticamente.
- Perfil inteligente do médico: especialidade, CRM, RQE, cidade, serviços, público e tom de voz.
- Criador de roteiros com OpenAI Responses API e Structured Outputs.
- Fallback local quando a chave da OpenAI ainda não foi configurada.
- Instagram Pro com importação de Insights, diagnóstico visual por IA e plano estratégico por `@`.
- Biblioteca, calendário, Central CRM e interface atual preservados.
- Planejamento editorial com data, horário, anexos, edição, exclusão, exportação e lembretes dentro da plataforma. Notificações do navegador funcionam com a plataforma aberta em segundo plano.

## Configuração

Crie um arquivo chamado `.env` na mesma pasta do `server.py`. Use `.env.example` como referência e substitua os valores de exemplo pelas suas credenciais. O servidor carrega esse arquivo automaticamente ao iniciar.

Também é possível definir as variáveis diretamente no terminal antes de iniciar o servidor.

Obrigatórias para IA real:

```powershell
$env:OPENAI_API_KEY="sua-chave"
```

## Executar

```powershell
python server.py
```

Abra:

```text
http://127.0.0.1:4173/
```

## Publicação na Hostinger

Este projeto não é somente um arquivo HTML: a IA, o login e o banco dependem do `server.py`. Na Hostinger, use um VPS Linux. A hospedagem compartilhada comum serve arquivos estáticos, mas não mantém este backend Python em execução.

Envie para o VPS os arquivos do projeto, exceto `.env`, `med_creator.db`, logs e `__pycache__`. Crie o `.env` diretamente no servidor:

```env
OPENAI_API_KEY=sua-chave-privada
OPENAI_MODEL=gpt-5.4-mini
MED_CREATOR_HOST=0.0.0.0
MED_CREATOR_PORT=4173
MED_CREATOR_COOKIE_SECURE=true
MED_CREATOR_DB_PATH=/var/lib/med-creator/med_creator.db
```

Instale Python 3 e `curl`, execute o backend como serviço persistente e coloque Nginx na frente do processo para conectar o domínio com HTTPS. Configure backup recorrente do caminho definido em `MED_CREATOR_DB_PATH`.

Use os modelos em `deploy/med-creator.service.example` e `deploy/nginx-med-creator.conf.example` como ponto de partida. Depois de ativar o domínio, emita o certificado HTTPS e mantenha `MED_CREATOR_COOKIE_SECURE=true`.

Nunca coloque `OPENAI_API_KEY` dentro do `index.html`, em arquivos JavaScript públicos ou no repositório. A chave deve existir somente como variável privada no servidor.

## Observações importantes

- A conexão oficial com a API do Instagram fica disponível quando as credenciais da Meta e a URL HTTPS de callback forem configuradas no `.env`. A importação de Insights e o diagnóstico por print continuam disponíveis como rotas complementares.
- Para publicação comercial, hospede o backend com HTTPS, use uma chave secreta de sessão e configure rotinas de backup.
- Não envie prontuários ou dados identificáveis de pacientes para análise sem base legal e salvaguardas adequadas.

## Cadastro e liberação manual

A tela inicial recebe apenas nome, e-mail, WhatsApp e CRM. Cada solicitação fica salva como pendente no banco.

Para receber novos cadastros por e-mail, configure um servidor SMTP no `.env`:

```env
ACCESS_REQUEST_NOTIFY_EMAIL=marcosestevees@icloud.com
SMTP_ENABLED=true
SMTP_HOST=smtp.seu-provedor.com
SMTP_PORT=587
SMTP_USER=seu_usuario_smtp
SMTP_PASSWORD=sua_senha_smtp
SMTP_FROM=seu_remetente@dominio.com
```

Sem SMTP, o cadastro continua salvo no banco e pode ser consultado no terminal:

```powershell
python manage_access.py list
```

Para liberar um acesso pendente:

```powershell
python manage_access.py approve --email medico@clinica.com.br --specialty "Dermatologia"
```

## Instagram oficial com OAuth

Na Hostinger, publique este backend em um VPS com domínio HTTPS antes de cadastrar o callback na Meta. Depois, configure:

```env
META_INSTAGRAM_CLIENT_ID=seu_instagram_app_id
META_INSTAGRAM_CLIENT_SECRET=seu_instagram_app_secret
META_INSTAGRAM_REDIRECT_URI=https://app.seu-dominio.com.br/api/instagram/oauth/callback
META_INSTAGRAM_SCOPES=instagram_business_basic,instagram_business_manage_insights
META_INSTAGRAM_WEBHOOK_VERIFY_TOKEN=crie_um_token_secreto
```

Cadastre exatamente a mesma URL de `META_INSTAGRAM_REDIRECT_URI` como URI OAuth válida no painel da Meta. O médico poderá usar o botão `Conectar oficialmente` dentro do Instagram Pro. A senha do Instagram nunca passa pela Med Creator PRO.

## Aviso de novo cadastro no WhatsApp

O cadastro sempre fica salvo como pendente no banco e a tela oferece um link pré-preenchido para avisar o atendimento. Para receber também uma mensagem automática pelo WhatsApp Cloud API, crie um template aprovado com quatro parâmetros no corpo: nome, e-mail, WhatsApp e CRM. Configure:

```env
ACCESS_REQUEST_WHATSAPP=5511924787933
WHATSAPP_CLOUD_ACCESS_TOKEN=seu_token_whatsapp_cloud_api
WHATSAPP_CLOUD_PHONE_NUMBER_ID=seu_phone_number_id
WHATSAPP_ACCESS_TEMPLATE=novo_cadastro_med_creator
WHATSAPP_ACCESS_TEMPLATE_LANGUAGE=pt_BR
```
