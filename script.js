// 1. Animações Suaves de Scroll (Intersection Observer)
// Isso cria a elegância que impressiona recrutadores: os elementos surgem suavemente ao rolar.
const elementosFadeIn = document.querySelectorAll('.fade-in');

const observerOpcoes = {
    root: null,
    threshold: 0.15, // Aciona quando 15% do elemento estiver visível na tela
    rootMargin: "0px"
};

const fadeObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Adiciona a classe que roda a animação do CSS
            entry.target.classList.add('visivel');
            // Para de observar depois que já apareceu uma vez
            observer.unobserve(entry.target);
        }
    });
}, observerOpcoes);

elementosFadeIn.forEach(elemento => {
    fadeObserver.observe(elemento);
});


// 2. Validação de Formulário com princípios de IHC
// Dá feedback em tempo real para o usuário não se frustrar ao clicar em "Enviar"
const inputEmail = document.getElementById('email');
const mensagemErro = document.getElementById('email-error');
const formulario = document.getElementById('contact-form');

// Validação em tempo real enquanto o usuário digita
inputEmail.addEventListener('input', function() {
    // Regex simples para verificar se tem o formato de e-mail (texto@texto.com)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (this.value === '') {
        mensagemErro.style.display = 'none';
        this.style.borderColor = '#334155';
    } else if (!regexEmail.test(this.value)) {
        mensagemErro.style.display = 'block';
        this.style.borderColor = 'var(--accent-color)';
    } else {
        mensagemErro.style.display = 'none';
        this.style.borderColor = '#10b981'; // Fica verdinho se estiver certo (feedback positivo)
    }
});

// Impede o envio se houver erro (simulação)
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página
    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(inputEmail.value)) {
        alert('Mensagem enviada com sucesso! (Isso é uma simulação via JavaScript)');
        formulario.reset();
        inputEmail.style.borderColor = '#334155';
    } else {
        inputEmail.focus(); // Joga o foco do teclado para o campo com erro
    }
});