const carro = document.getElementById('carro');
carro.addEventListener('mouseenter', () => {
    carro.style.transform = 'translateY(-15px)';
});
carro.addEventListener('mouseleave', () => {
    carro.style.transform = 'translateY(0)';
});

const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/src/pages/home.html';
    });
}

window.addEventListener('load', async function getUserData() {
    if (!localStorage.getItem('token')) {
        alert('Você precisa estar logado para acessar esta página. Redirecionando para o login...');
        window.location.href = '/src/pages/login.html';
        return;
    }
    try{
        const response = await fetch('/auth/data', {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const [user, is_admin] = await response.json();
            userGreetings = document.getElementById('user-name')
            adminStatus = document.getElementById('admin-status')
            const userFirstName = user.name.split(' ')[0];
            if (userGreetings && user && user.name) {
                userGreetings.textContent = `Bem-vindo, ${userFirstName}!`;
            } else {
                console.error('Não foi possível obter o nome do usuário ou elemento não encontrado');
            }
            if (adminStatus && is_admin) {
                adminStatus.textContent = is_admin ? 'Administrador' : 'Usuário';
            } else {
                console.error('Não foi possível obter o status do usuário ou elemento não encontrado');
            }
        } else {
            console.error('Não foi possível obter os dados do usuário ou resposta inválida');
        }
    } catch(error) {
        console.error('Erro ao buscar dados do usuário:', error);
    }
})
