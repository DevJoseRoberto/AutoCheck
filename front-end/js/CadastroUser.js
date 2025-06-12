let loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value
    const cpf = document.getElementById('cpf').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    const birthdate = document.getElementById('birthdate').value
    const password = document.getElementById('password').value
    const confirm_password = document.getElementById('confirm_password').value
    const is_admin = document.getElementById('is_admin').checked
    
    const responseDiv = document.getElementById('response')
    
    responseDiv.innerHTML = ''
    try{
        const response = await fetch('http://127.0.0.1:8000/users/register', {
            method: 'POST', 
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name, cpf, phone, email, birthdate, password, confirm_password, is_admin}),
        });

        
        if (response.ok){ 
            const result = await response.json()
            responseDiv.innerHTML = `
            <p class="success">Login bem-sucedido!</p>
            `
        } else {
            const error = await response.json()
            responseDiv.innerHTML = `
            <p class="error">${error.detail}</p>
            `
        }
    } catch(error){
       
    }
})