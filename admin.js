// Função para exibir notificações (consistente com script.js)
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) {
        // Cria dinamicamente o elemento de notificação se não existir
        const notificationDiv = document.createElement('div');
        notificationDiv.id = 'notification';
        notificationDiv.className = `notification ${type}`;
        notificationDiv.style.display = 'none';
        notificationDiv.setAttribute('aria-live', 'polite');
        document.querySelector('.container1').prepend(notificationDiv);
    }
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Desaparece após 3 segundos
}

// Exibir nome do administrador
document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuario = document.getElementById('nome-usuario');
    // Simula obtenção do nome (substitua por chamada à API ou localStorage real)
    const adminName = localStorage.getItem('adminName') || 'Administrador';
    nomeUsuario.textContent = adminName;
});

// Funcionalidade do botão de logout
document.getElementById('logout').addEventListener('click', () => {
    if (confirm('Deseja realmente sair?')) {
        // Simula logout (limpa localStorage e redireciona)
        localStorage.removeItem('adminName');
        showNotification('Logout realizado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html'; // Ajuste para a página de login real
        }, 1000);
        
        // Exemplo de chamada AJAX para logout (descomente quando o backend estiver pronto)
        /*
        fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                showNotification('Logout realizado com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            } else {
                showNotification('Erro ao realizar logout.', 'error');
            }
        })
        .catch(error => {
            showNotification('Erro ao conectar com o servidor.', 'error');
        });
        */
    }
});

// Toggle da barra lateral em dispositivos móveis
document.getElementById('toggle-sidebar1').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar1');
    sidebar.classList.toggle('ativo');
});

// Atualizar estatísticas (simulação)
document.addEventListener('DOMContentLoaded', () => {
    // Valores fictícios para estatísticas (substitua por chamada à API)
    const estatisticas = {
        totalUsuarios: 0,
        totalVeiculos: 0,
        totalConsultas: 0
    };

    document.getElementById('total-usuarios').textContent = estatisticas.totalUsuarios;
    document.getElementById('total-veiculos').textContent = estatisticas.totalVeiculos;
    document.getElementById('total-consultas').textContent = estatisticas.totalConsultas;

    // Exemplo de chamada AJAX para estatísticas (descomente quando o backend estiver pronto)
    /*
    fetch('/api/estatisticas', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('total-usuarios').textContent = data.totalUsuarios || 0;
        document.getElementById('total-veiculos').textContent = data.totalVeiculos || 0;
        document.getElementById('total-consultas').textContent = data.totalConsultas || 0;
    })
    .catch(error => {
        showNotification('Erro ao carregar estatísticas.', 'error');
        document.getElementById('total-usuarios').textContent = 'Erro';
        document.getElementById('total-veiculos').textContent = 'Erro';
        document.getElementById('total-consultas').textContent = 'Erro';
    });
    */
});