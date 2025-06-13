// Função para fazer login
async function login(username, password) {
    try {
        const response = await fetch('http://localhost:8000/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username,
                password
            })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        const token = data.access_token;
        
        // Salvar token e decodificar informações do usuário
        localStorage.setItem('token', token);
        const userData = decodeToken(token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirecionar para página principal
        window.location.href = '/index.html';
        
        return userData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Função para decodificar o token
function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

// Função para verificar se o usuário está logado
function isLoggedIn() {
    return !!localStorage.getItem('token');
}

// Função para obter informações do usuário
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Função para fazer logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Exportar funções para uso em outras partes do app
export { login, isLoggedIn, getCurrentUser, logout };
