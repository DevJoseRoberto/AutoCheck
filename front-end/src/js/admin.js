// Função para exibir notificações (opcional, para feedback visual)
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.zIndex = '1300';
    notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Toggle da sidebar em telas menores
document.querySelector('.menu-toggle').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    sidebar.classList.toggle('visible');
    mainContent.classList.toggle('expanded');
});

// Gerenciar a navegação entre seções
document.querySelectorAll('.sidebar-menu a[data-section]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Impede o comportamento padrão do link

        // Remove a classe 'active' de todos os links e seções
        document.querySelectorAll('.sidebar-menu a').forEach(a => a.classList.remove('active'));
        document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));

        // Adiciona a classe 'active' ao link clicado e à seção correspondente
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');

        // Esconde a sidebar em telas menores após selecionar uma seção
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('visible');
            document.querySelector('.main-content').classList.add('expanded');
        }
    });
});

// Funcionalidade de logout
document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm('Deseja realmente sair?')) {
        showNotification('Logout realizado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'login.html'; // Redireciona para a página de login
        }, 1000);
    }
});

// Marcar a seção inicial como ativa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const defaultLink = document.querySelector('.sidebar-menu a[data-section="veiculos"]');
    defaultLink.classList.add('active');
});