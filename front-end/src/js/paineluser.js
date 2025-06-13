function mudarStatus(button) {
  const statusSpan = button.closest('tr')?.querySelector('.badge') || button.closest('.perfil-info').querySelector('.badge');
  if (statusSpan.classList.contains('ativo')) {
    statusSpan.classList.remove('ativo');
    statusSpan.classList.add('inativo');
    statusSpan.textContent = 'Inativo';
  } else {
    statusSpan.classList.remove('inativo');
    statusSpan.classList.add('ativo');
    statusSpan.textContent = 'Ativo';
  }
}

function verMultas() {
  alert('Listagem de multas ainda não implementada.');
}