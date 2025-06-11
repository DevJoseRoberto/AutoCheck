let loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const formData = new URLSearchParams();
    formData.append('cpf', cpf)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('password', password)

    try{
        const response = await fetch('http://127.0.0.1:8000/users/register', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
            },
            body: formData,
        });

        const result = await response.json()
        
        const responseDiv = document.getElementById('response')
        responseDiv.innerHTML = `
        <p class="success">Login bem-sucedido!</p>
        <p>${result.access_token}</p>
        `
    } catch(error){
        const responseDiv = document.getElementById('response')
        responseDiv.innerHTML = `<p class="error">Erro ao fazer o login</p>`
    }
})