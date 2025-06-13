// Função compartilhada para exibir notificações
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) return; // Evita erros se o elemento não existir na página
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000); // Desaparece após 3 segundos
}


window.addEventListener('load', async function getUserData() {
    if (!localStorage.getItem('token')) {
        alert('Você precisa estar logado para acessar esta página. Redirecionando para o login...');
        window.location.href = '/src/pages/login.html';
        return;
    }
})
// Validação do formulário de cadastro de veículos
document.getElementById('formCadastroVeiculo')?.addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o envio para validação

    // Limpa mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    // Obtém os valores dos campos
    const plate = document.getElementById('plate').value.trim().toUpperCase();
    const renavam = document.getElementById('renavam').value.trim();
    const brand = document.getElementById('brand').value.trim();
    const model = document.getElementById('model').value.trim();
    const vehicle_year = document.getElementById('vehicle_year').value;
    const color = document.getElementById('color').value.trim();
    const tipoCombustivel = document.getElementById('tipoCombustivel').value;
    const chassi_number = document.getElementById('chassi_number').value.trim().toUpperCase();

    let isValid = true;

    // Validação da plate (formato brasileiro: 3 letras + 4 números ou Mercosul)
    const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    if (!plateRegex.test(plate)) {
        document.querySelector('#plate + .error-message').textContent = 'plate inválida. Use o formato ABC1D23.';
        document.querySelector('#plate + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do RENAVAM (11 dígitos numéricos)
    const renavamRegex = /^\d{11}$/;
    if (!renavamRegex.test(renavam)) {
        document.querySelector('#renavam + .error-message').textContent = 'RENAVAM deve ter 11 dígitos numéricos.';
        document.querySelector('#renavam + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação da brand
    if (brand === '') {
        document.querySelector('#brand + .error-message').textContent = 'Por favor, preencha a brand.';
        document.querySelector('#brand + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do model
    if (model === '') {
        document.querySelector('#model + .error-message').textContent = 'Por favor, preencha o model.';
        document.querySelector('#model + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do ano de fabricação
    const currentYear = new Date().getFullYear();
    if (!vehicle_year || vehicle_year < 1900 || vehicle_year > currentYear + 1) {
        document.querySelector('#vehicle_year + .error-message').textContent = `Ano deve ser entre 1900 e ${currentYear + 1}.`;
        document.querySelector('#vehicle_year + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação da color
    if (color === '') {
        document.querySelector('#color + .error-message').textContent = 'Por favor, preencha a color.';
        document.querySelector('#color + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do tipo de combustível
    if (!tipoCombustivel) {
        document.querySelector('#tipoCombustivel + .error-message').textContent = 'Selecione um tipo de combustível.';
        document.querySelector('#tipoCombustivel + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do número do chassi (17 caracteres alfanuméricos)
    const chassiRegex = /^[A-Z0-9]{17}$/;
    if (!chassiRegex.test(chassi_number)) {
        document.querySelector('#chassi_number + .error-message').textContent = 'Chassi deve ter 17 caracteres alfanuméricos.';
        document.querySelector('#chassi_number + .error-message').style.display = 'block';
        isValid = false;
    }

    // Se todas as validações passarem
    if (isValid) {
        // Simula sucesso (substitua por AJAX quando houver backend)
        showNotification('Veículo cadastrado com sucesso!', 'success');
        this.reset();

        reponseDiv = document.getElementById('response')

        const data = { plate, renavam, brand, model, vehicle_year, color, tipoCombustivel, chassi_number };
        try {
            const response = await fetch('http://127.0.0.1:8000/vehicles/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                showNotification('Veículo cadastrado com sucesso!', 'success');
                this.reset();
            } else {
                const error = await response.json()
                responseDiv.innerHTML = `
                <p class="error">${error.detail}</p>
                `
            }
        } catch (error) {

        }
    }
});


// Filtro dinâmico na tabela de administradores (mantido do código anterior, se necessário)
document.getElementById('search')?.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll('.admin-list tbody tr');

    rows.forEach(row => {
        const nome = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        row.style.display = nome.includes(searchTerm) || email.includes(searchTerm) ? '' : 'none';
    });
});
