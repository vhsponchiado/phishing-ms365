# PHISHING SIMULATOR

Sistema educacional de simulação de phishing usando página falsa de login do Microsoft 365.

> **AVISO LEGAL**: Este projeto é para fins educacionais, pesquisa de segurança e CTF (Capture The Flag) apenas. Uso indevido é ilegal.

---

## Objetivo Educacional

Este projeto foi desenvolvido para ensinar sobre:
- Como funcionam ataques de phishing
- Técnicas de engenharia social
- Importância de verificar URLs e certificados SSL
- Como proteger-se contra phishing
- Segurança em autenticação

---

## Estrutura do Projeto

```
phishing/
│
├── index.html          # Página falsa de login do Microsoft 365
├── app.py              # Backend Flask para capturar credenciais
├── requirements.txt    # Dependências Python
├── README.md           # Esta documentação
├── .gitignore          # Arquivos que não serão versionados
│
└── captured_credentials.json  # Arquivo com credenciais capturadas (gerado)
```

---

## Instalação

### Passo 1: Instale as dependências

```bash
npm install
```

Isso instalará:
- Express - Framework web Node.js

### Passo 2: Verifique a instalação

```bash
node -v
npm -v
```

---

## Como Usar

### Iniciando o servidor

```bash
npm start
```

Ou:

```bash
node app.js
```

A aplicação será iniciada em `http://127.0.0.1:5000`

Saída esperada:
```
╔════════════════════════════════════════════════╗
║         PHISHING SIMULATOR - EDUCATIONAL       ║
║                                                ║
║    AVISO LEGAL: Para fins educacionais        ║
║    e pesquisa de segurança apenas!             ║
║                                                ║
║    Endpoints disponíveis:                       ║
║    - GET  /               : Página de login     ║
║    - POST /login          : Captura credenciais ║
║    - GET  /admin/credentials : Ver credenciais  ║
║    - POST /admin/clear    : Limpar dados        ║
╚════════════════════════════════════════════════╝

 * Running on http://127.0.0.1:5000
 * Press Ctrl+C to quit
```

### Acessando a página de phishing

1. Abra o navegador
2. Acesse: `http://127.0.0.1:5000`
3. Você verá uma página falsa de login do Microsoft 365

### Testando o phishing

1. Na página, insira qualquer email e senha
2. Clique em "Sign in"
3. Você receberá uma mensagem de erro (como em um ataque real)
4. As credenciais serão salvas em `captured_credentials.json`

### Visualizar credenciais capturadas

Via navegador:
```
GET http://127.0.0.1:5000/admin/credentials
```

Via linha de comando:
```bash
curl http://127.0.0.1:5000/admin/credentials
```

Resposta:
```json
{
  "total": 1,
  "credentials": [
    {
      "timestamp": "2026-09-29T10:30:45.123456",
      "email": "usuario@example.com",
      "password": "senha123",
      "remember_me": false,
      "ip_address": "127.0.0.1",
      "user_agent": "Mozilla/5.0...",
      "referer": "http://127.0.0.1:5000/"
    }
  ]
}
```

### Limpar credenciais capturadas

```bash
curl -X POST http://127.0.0.1:5000/admin/clear
```

---

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Serve a página de login falsa |
| POST | `/login` | Recebe e salva credenciais |
| GET | `/admin/credentials` | Visualiza credenciais capturadas |
| POST | `/admin/clear` | Limpa todas as credenciais |

---

## Como o Phishing Funciona

### Fluxo Normal (Phishing Real)

```
1. Vítima recebe email suspeito com link
   ↓
2. Clica no link e vai para página falsa
   ↓
3. Insere suas credenciais reais
   ↓
4. Atacante captura e usa as credenciais
   ↓
5. Vítima recebe erro de "credenciais inválidas"
   ↓
6. Vítima tenta novamente e acaba descobrindo o golpe
```

### Neste Projeto

```
1. Você acessa http://127.0.0.1:5000
   ↓
2. Vê uma página falsa idêntica ao Microsoft 365
   ↓
3. Insere email e senha de teste
   ↓
4. Backend captura as credenciais no arquivo JSON
   ↓
5. Usuário recebe erro (como em ataque real)
   ↓
6. Credenciais ficam armazenadas para análise
```

---

## Técnicas de Phishing Utilizadas

### 1. **Cópia Fiel da Interface Original**
   - Layout idêntico ao Microsoft 365
   - Logo da Microsoft com SVG
   - Cores e fontes iguais
   - Design responsivo

### 2. **Validação de Formulário**
   - Campos obrigatórios (email e senha)
   - Mensagens de erro realistas
   - Spinner de carregamento para parecer mais real

### 3. **Coleta de Informações Extras**
   - IP do atacante
   - User Agent do navegador
   - Timestamp do acesso
   - Opção "Manter conectado"

### 4. **Redirecionamento Falso**
   - Depois de "falhar", deveria redirecionar para Outlook
   - Simula o comportamento real de um ataque

---

## Sinais de Alerta para Phishing Real

Ao usar este projeto, observe os sinais que você deveria procurar em ataques reais:

[OK] Sinais de Segurança Legítimos:
- [OK] URL começa com `https://`
- [OK] Ícone de cadeado no navegador
- [OK] Certificado SSL válido
- [OK] Domínio correto da empresa (microsoft.com, outlook.com)

[PERIGO] Sinais de Phishing:
- [PERIGO] URL suspeita ou encurtada
- [PERIGO] Falta de HTTPS
- [PERIGO] Certificado auto-assinado ou expirado
- [PERIGO] Domínio parecido mas não idêntico
- [PERIGO] Pressão para agir rápido
- [PERIGO] Pedido inesperado de credenciais
- [PERIGO] Email de origem suspeita
- [PERIGO] Links que não batem com o texto

---

## Como se Proteger

1. **Verifique a URL**
   - Sempre olhe a barra de endereço
   - Procure por `https://` e cadeado
   - Desconfie de URLs encurtadas

2. **Não Clique em Links de Email**
   - Acesse sites digitando a URL diretamente
   - Ou através de um bookmark salvo

3. **Verifique o Certificado SSL**
   - Clique no cadeado
   - Procure por certificados válidos
   - Desconfie de certificados auto-assinados

4. **Use Autenticação em Dois Fatores (2FA)**
   - Mesmo que sua senha vaze, sua conta fica protegida
   - Microsoft 365 oferece 2FA

5. **Desconfie de Emails Suspeitos**
   - Erros de digitação ou gramática
   - Remetente desconhecido
   - Pedidos urgentes de informações pessoais

6. **Use um Gerenciador de Senhas**
   - Preenche senha automaticamente
   - Desconfia de URLs diferentes
   - Exemplos: Bitwarden, 1Password, KeePass

---

## Questões para Discussão

1. Como você detectaria esse phishing em uma situação real?
2. Qual seria o primeiro sinal de que algo está errado?
3. Como uma empresa deveria se proteger contra phishing?
4. Qual é o papel da educação de usuários na segurança?
5. Como seriam diferentes os indicadores se fosse via QR code?

---

## Recursos Educacionais

- [OWASP Phishing](https://owasp.org/www-community/attacks/phishing)
- [Microsoft Security Awareness Training](https://www.microsoft.com/en-us/security/business/security-awareness-training)
- [FBI - Common Phishing Scams](https://www.fbi.gov/investigate/cyber/phishing-and-online-fraud)
- [Verizon DBIR Report](https://www.verizon.com/business/resources/reports/dbir/)

---

## Importante

- **NUNCA** use este código para ataques reais
- **NUNCA** coloque em servidores públicos
- **SEMPRE** tenha permissão antes de testes de segurança
- **SEMPRE** documente e reporte achados
- **SEMPRE** considere as consequências legais

---

## Uso Permitido

[OK] Use em ambientes educacionais
[OK] Use em treinamentos de segurança
[OK] Use em CTF competitions
[OK] Use em pesquisa acadêmica
[OK] Use para demonstrar vulnerabilidades em testes autorizados

## Uso Proibido

[PROIBIDO] NÃO use para prejudicar pessoas reais
[PROIBIDO] NÃO use para roubar credenciais
[PROIBIDO] NÃO use para acessar contas sem autorização
[PROIBIDO] NÃO use para fins de extorsão ou chantagem
[PROIBIDO] NÃO use em servidores públicos

---

## Disclaimer Legal

Uso indevido é **CRIME** e sujeito a penalidades legais severas, incluindo:
- Processos criminais
- Prisão
- Multas pesadas
- Condenação por fraude eletrônica
- Processos civis

Use este projeto **APENAS** para fins educacionais em ambientes controlados.

---

**Desenvolvido para fins educacionais - 2026**

*Use com responsabilidade!*
