// Função para exibir notificações
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
        e.preventDefault();

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
            window.location.href = '../pages/login.html';
        }, 1000);
    }
});

// Gerenciamento de Modal
function openVehicleModal() {
    const modal = document.getElementById('vehicleModal');
    modal.style.display = 'block';
    
    // Adicionar evento para fechar ao clicar fora do modal
    document.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('vehicleModal');
    modal.style.display = 'none';
    
    // Remover o evento de click quando o modal for fechado
    document.removeEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Fechar modal ao clicar no botão X
document.querySelector('.close-modal').addEventListener('click', closeModal);

// Gerenciamento de Veículos
async function fetchVehicles() {
    try {
        const response = await fetch('/api/vehicles');
        const vehicles = await response.json();
        updateVehicleTable(vehicles);
    } catch (error) {
        showNotification('Erro ao carregar veículos', 'error');
    }
}

function updateVehicleTable(vehicles) {
    const tbody = document.querySelector('#vehicleTableBody');
    tbody.innerHTML = '';
    
    vehicles.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicle.plate}</td>
            <td>${vehicle.model}</td>
            <td>${vehicle.year}</td>
            <td>${vehicle.color}</td>
            <td>${vehicle.owner}</td>
            <td>
                <button onclick="editVehicle('${vehicle.plate}')">Editar</button>
                <button onclick="deleteVehicle('${vehicle.plate}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function editVehicle(plate) {
    // Implementar modal de edição
    showNotification('Funcionalidade de edição em desenvolvimento', 'info');
}

async function deleteVehicle(plate) {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
        try {
            const response = await fetch(`/api/vehicles/${plate}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                showNotification('Veículo excluído com sucesso', 'success');
                fetchVehicles();
            } else {
                showNotification('Erro ao excluir veículo', 'error');
            }
        } catch (error) {
            showNotification('Erro ao excluir veículo', 'error');
        }
    }
}


document.getElementById('vehicleForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        plate: document.getElementById('plate').value,
        model: document.getElementById('model').value,
        year: document.getElementById('year').value,
        color: document.getElementById('color').value,
        owner: document.getElementById('owner').value
    };

    try {
        const response = await fetch('/api/vehicles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showNotification('Veículo cadastrado com sucesso!', 'success');
            closeModal();
            fetchVehicles();
            document.getElementById('vehicleForm').reset();
        } else {
            showNotification('Erro ao cadastrar veículo', 'error');
        }
    } catch (error) {
        showNotification('Erro ao cadastrar veículo', 'error');
    }
});

// Gerenciamento de Multas
async function fetchFines() {
    try {
        const response = await fetch('/api/fines');
        const fines = await response.json();
        updateFinesTable(fines);
    } catch (error) {
        showNotification('Erro ao carregar multas', 'error');
    }
}

function updateFinesTable(fines) {
    const tbody = document.querySelector('#finesTableBody');
    tbody.innerHTML = '';
    
    fines.forEach(fine => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fine.id}</td>
            <td>${fine.vehiclePlate}</td>
            <td>${fine.date}</td>
            <td>${fine.value}</td>
            <td>${fine.status}</td>
            <td>
                <button onclick="editFine('${fine.id}')">Editar</button>
                <button onclick="deleteFine('${fine.id}')">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Gerenciamento de Consultas
async function fetchQueryLogs() {
    try {
        const response = await fetch('/api/query-logs');
        const logs = await response.json();
        updateQueryLogs(logs);
    } catch (error) {
        showNotification('Erro ao carregar logs', 'error');
    }
}

function updateQueryLogs(logs) {
    const tbody = document.querySelector('#logsTableBody');
    tbody.innerHTML = '';
    
    logs.forEach(log => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${log.id}</td>
            <td>${log.user}</td>
            <td>${log.timestamp}</td>
            <td>${log.type}</td>
            <td>${log.details}</td>
        `;
        tbody.appendChild(row);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const defaultLink = document.querySelector('.sidebar-menu a[data-section="veiculos"]');
    defaultLink.classList.add('active');
    
    // Carregar dados iniciais
    fetchVehicles();
    fetchFines();
    fetchQueryLogs();
});