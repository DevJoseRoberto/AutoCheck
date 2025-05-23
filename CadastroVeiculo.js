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

// Validação do formulário de cadastro de veículos
document.getElementById('formCadastroVeiculo')?.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio para validação

    // Limpa mensagens de erro anteriores
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });

    // Obtém os valores dos campos
    const placa = document.getElementById('placa').value.trim().toUpperCase();
    const renavam = document.getElementById('renavam').value.trim();
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const anoFabricacao = document.getElementById('anoFabricacao').value;
    const cor = document.getElementById('cor').value.trim();
    const tipoCombustivel = document.getElementById('tipoCombustivel').value;
    const numeroChassi = document.getElementById('numeroChassi').value.trim().toUpperCase();

    let isValid = true;

    // Validação da placa (formato brasileiro: 3 letras + 4 números ou Mercosul)
    const placaRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
    if (!placaRegex.test(placa)) {
        document.querySelector('#placa + .error-message').textContent = 'Placa inválida. Use o formato ABC1D23.';
        document.querySelector('#placa + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do RENAVAM (11 dígitos numéricos)
    const renavamRegex = /^\d{11}$/;
    if (!renavamRegex.test(renavam)) {
        document.querySelector('#renavam + .error-message').textContent = 'RENAVAM deve ter 11 dígitos numéricos.';
        document.querySelector('#renavam + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação da marca
    if (marca === '') {
        document.querySelector('#marca + .error-message').textContent = 'Por favor, preencha a marca.';
        document.querySelector('#marca + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do modelo
    if (modelo === '') {
        document.querySelector('#modelo + .error-message').textContent = 'Por favor, preencha o modelo.';
        document.querySelector('#modelo + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação do ano de fabricação
    const currentYear = new Date().getFullYear();
    if (!anoFabricacao || anoFabricacao < 1900 || anoFabricacao > currentYear + 1) {
        document.querySelector('#anoFabricacao + .error-message').textContent = `Ano deve ser entre 1900 e ${currentYear + 1}.`;
        document.querySelector('#anoFabricacao + .error-message').style.display = 'block';
        isValid = false;
    }

    // Validação da cor
    if (cor === '') {
        document.querySelector('#cor + .error-message').textContent = 'Por favor, preencha a cor.';
        document.querySelector('#cor + .error-message').style.display = 'block';
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
    if (!chassiRegex.test(numeroChassi)) {
        document.querySelector('#numeroChassi + .error-message').textContent = 'Chassi deve ter 17 caracteres alfanuméricos.';
        document.querySelector('#numeroChassi + .error-message').style.display = 'block';
        isValid = false;
    }

    // Se todas as validações passarem
    if (isValid) {
        // Simula sucesso (substitua por AJAX quando houver backend)
        showNotification('Veículo cadastrado com sucesso!', 'success');
        this.reset();

        // Exemplo de chamada AJAX (descomente e ajuste quando o backend estiver pronto)
        /*
        const data = { placa, renavam, marca, modelo, anoFabricacao, cor, tipoCombustivel, numeroChassi };
        try {
            const response = await fetch('/api/veiculos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                showNotification('Veículo cadastrado com sucesso!', 'success');
                this.reset();
            } else {
                showNotification('Erro ao cadastrar veículo.', 'error');
            }
        } catch (error) {
            showNotification('Erro ao conectar com o servidor.', 'error');
        }
        */
    }
});

// Validação do formulário de administradores (mantido do código anterior, se necessário)
document.querySelector('form:not(#formCadastroVeiculo)')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const senha = document.getElementById('senha')?.value;
    const confirmarSenha = document.getElementById('confirmar-senha')?.value;

    if (!nome || !email || !senha || !confirmarSenha) return; // Evita erros se os campos não existirem

    if (nome === '') {
        showNotification('Por favor, preencha o nome completo.', 'error');
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Por favor, insira um e-mail válido.', 'error');
        return;
    }
    if (senha.length < 6) {
        showNotification('A senha deve ter pelo menos 6 caracteres.', 'error');
        return;
    }
    if (senha !== confirmarSenha) {
        showNotification('As senhas não coincidem.', 'error');
        return;
    }

    showNotification('Administrador cadastrado com sucesso!', 'success');
    this.reset();
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