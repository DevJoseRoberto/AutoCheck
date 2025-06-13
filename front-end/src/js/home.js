const carro = document.getElementById('carro');
carro.addEventListener('mouseenter', () => {
    carro.style.transform = 'translateY(-15px)';
});
carro.addEventListener('mouseleave', () => {
    carro.style.transform = 'translateY(0)';
});