// Adicione em uma tag <script> no final do HTML ou em um arquivo .js separado
document.getElementById('adminForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Impede o envio do formulário para validação

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const birthdate = document.getElementById('birthdate').value.trim();
  const cpf = document.getElementById('cpf').value.trim().replace(/\D/g, '');
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirm_password').value;
  const ativo = document.getElementById('ativo').checked;

  // Validação básica
  if (name === '') {
    alert('Por favor, preencha o nome completo.');
    return;
  }
  if (cpf.length !== 11) {
    alert('Por favor, insira um CPF válido (11 dígitos).');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }
  if (senha.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        birthdate: birthdate,
        email: email,
        password: senha,
        confirm_password: senha,
        cpf: cpf,
        is_admin: true,
        ativo: ativo
      })
    });

    if (response.ok) {
      alert('Administrador cadastrado com sucesso!');
      // Limpa o formulário
      this.reset();
      // Redireciona para a página de login ou admin
      window.location.href = '/src/pages/login.html';
    } else {
      const error = await response.json();
      alert(error.detail || 'Erro ao cadastrar administrador.');
    }
  } catch (error) {
    alert('Erro ao se comunicar com o servidor.');
    console.error('Erro:', error);
  }
});

//barra de pesquisa

document.getElementById('search').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const rows = document.querySelectorAll('.admin-list tbody tr');

  rows.forEach(row => {
    const nome = row.cells[0].textContent.toLowerCase();
    const email = row.cells[1].textContent.toLowerCase();
    row.style.display = nome.includes(searchTerm) || email.includes(searchTerm) ? '' : 'none';
  });
});

//Ativar/Desativar Administradores

document.querySelectorAll('.admin-list td button').forEach(button => {
  button.addEventListener('click', function () {
    const row = this.closest('tr');
    const statusCell = row.querySelector('.status');
    const isDeactivate = this.classList.contains('btn-danger');

    if (this.textContent === 'Ativar' || this.textContent === 'Desativar') {
      if (confirm(`Deseja ${isDeactivate ? 'desativar' : 'ativar'} este administrador?`)) {
        statusCell.textContent = isDeactivate ? 'Inativo' : 'Ativo';
        statusCell.className = `status ${isDeactivate ? 'inactive' : 'active'}`;
        this.textContent = isDeactivate ? 'Ativar' : 'Desativar';
        this.className = `btn ${isDeactivate ? 'btn-success' : 'btn-danger'}`;
        // Em uma aplicação real, envie uma requisição AJAX para atualizar o status no backend
      }
    }
  });
});

//editar adm

document.querySelectorAll('.btn-secondary').forEach(button => {
  button.addEventListener('click', function () {
    const row = this.closest('tr');
    const nome = row.cells[0].textContent;
    const email = row.cells[1].textContent;
    const status = row.querySelector('.status').textContent === 'Ativo';

    // Preenche o formulário
    document.getElementById('nome').value = nome;
    document.getElementById('email').value = email;
    document.getElementById('ativo').checked = status;

    // Altera o botão do formulário para indicar atualização
    const form = document.querySelector('form');
    form.querySelector('.btn-primary').textContent = 'Atualizar Administrador';

    // Opcionalmente, rola até o formulário
    document.querySelector('.card2').scrollIntoView({ behavior: 'smooth' });

    // Em uma aplicação real, você lidaria com a atualização via chamada à API
  });
});

//Limpar Formulário Após Envio


document.querySelector('form').reset();
document.querySelector('.btn-primary').textContent = 'Cadastrar Administrador';

