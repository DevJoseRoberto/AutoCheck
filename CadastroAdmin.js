// Adicione em uma tag <script> no final do HTML ou em um arquivo .js separado
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault(); // Impede o envio do formulário para validação

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;

  // Validação básica
  if (nome === '') {
    alert('Por favor, preencha o nome completo.');
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

  // Se a validação passar, você pode enviar o formulário (ex.: via AJAX ou descomente a linha abaixo)
  // this.submit();
  alert('Administrador cadastrado com sucesso!'); // Placeholder para sucesso
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

