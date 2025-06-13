let loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    const responseDiv = document.getElementById('response')
    
    responseDiv.innerHTML = ''

    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    try{
        const response = await fetch('/auth/token', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString(),
            credentials: "include", // Necessário para cookies, mas opcional com query string
            redirect: "follow", // Garante que o navegador siga o redirecionamento
        });
        
        console.log("Status da resposta:", response.status);
        console.log("Cabeçalho Location:", response.headers.get("Location"));
        console.log("Redirecionamento iniciado...");

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.access_token);
            window.location.href = '/src/pages/home.html';
            return;
        } else {
            const error = await response.json()
            responseDiv.innerHTML = `
            <p class="error">${error.detail}</p>
            `
        }
    } catch(error) {
        responseDiv.innerHTML = `
            <p class="error">Erro ao fazer login: ${error.message}</p>
        `;
    }
})