let partyInterval; // Variável global para controlar o intervalo de cores do fundo
let confettiInterval; // Variável global para controlar o intervalo de confetes (agora infinito)
const partyColors = ['#ff007f', '#00ff7f', '#7f00ff', '#ff7f00', '#007fff', '#7fff00']; // Cores de festa

function mudarCor(){
    //obter o elemento quadrado
    let quadrado = document.getElementById('quadrado')

    //modificando o elemento
    quadrado.style.backgroundColor = 'red'
}

function mudarForma(){
    let quadrado = document.getElementById('quadrado')
    quadrado.style.borderRadius = '50%'
}

// Função auxiliar para parar a festa de fundo e os confetes
function stopParty() {
    // Para o fundo piscante
    if (partyInterval) {
        clearInterval(partyInterval);
        partyInterval = null;
    }
    document.body.style.transition = 'background-color 0.5s';
    document.body.style.backgroundColor = '#f0f0f0'; // Cor padrão de fundo (ou a cor original do seu body)

    // Para a chuva de confetes
    if (confettiInterval) {
        clearInterval(confettiInterval);
        confettiInterval = null;
    }

    // Remove todos os confetes que possam estar na tela
    document.querySelectorAll('.confetti').forEach(c => c.remove());
}

function voltarTudo(){
    let quadrado = document.getElementById('quadrado')
    
    // Para a festa de fundo e os confetes
    stopParty();

    // Volta os estilos do quadrado
    quadrado.style.backgroundColor = 'lightblue'
    quadrado.style.borderRadius = '0%'
    quadrado.style.width = '300px'
    quadrado.style.height = '300px'
    quadrado.style.transform = 'rotate(0deg)'
    quadrado.style.border = '1px solid black'; // Volta a borda padrão (se houver)
    quadrado.innerHTML = ''; // Limpa o conteúdo do gatinho
    quadrado.style.fontSize = 'initial';
    quadrado.style.lineHeight = 'initial';
    quadrado.style.display = 'initial';
}

function diminuir() {
    let quadrado = document.getElementById('quadrado')
    quadrado.style.width = '150px'
    quadrado.style.height = '150px'
}

function aumentar(){
    let quadrado = document.getElementById('quadrado')
    quadrado.style.width = '600px'
    quadrado.style.height = '600px'
}

function girar(){
    let quadrado = document.getElementById('quadrado')

    quadrado.style.transform = 'rotate(360deg)'
    quadrado.style.transition = 'all 1s ease-in-out'
}

// Lógica para fazer o fundo piscar colorido
function partyBackground() {
    // Para qualquer intervalo de festa anterior
    stopParty(); 

    let colorIndex = 0;
    document.body.style.transition = 'background-color 0.1s linear'; // Transição rápida para efeito de piscar

    partyInterval = setInterval(() => {
        document.body.style.backgroundColor = partyColors[colorIndex];
        colorIndex = (colorIndex + 1) % partyColors.length;
    }, 150); // Pisca a cada 150ms
}

// Lógica para criar e animar um único lote de confetes
function createConfettiDrop() {
    const confettiCount = 50; // Diminuído um pouco para evitar sobrecarga excessiva de elementos
    const bodyWidth = document.body.clientWidth;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti'); // Adiciona classe para facilitar a remoção

        // Estilos e posição inicial aleatória
        confetti.style.position = 'fixed';
        confetti.style.width = `${5 + Math.random() * 5}px`;
        confetti.style.height = `${5 + Math.random() * 5}px`;
        confetti.style.borderRadius = '50%'; // Confetes redondos
        confetti.style.backgroundColor = partyColors[Math.floor(Math.random() * partyColors.length)];
        confetti.style.top = `${-Math.random() * 100}px`; // Começa acima da tela
        confetti.style.left = `${Math.random() * bodyWidth}px`;
        confetti.style.opacity = '0.9';
        confetti.style.zIndex = '9999';
        
        // Animação de queda (mais lenta)
        const duration = 4 + Math.random() * 4;
        confetti.style.transition = `transform ${duration}s linear, opacity 0.5s`; // Aumentado para 4-8s
        
        document.body.appendChild(confetti);

        // Dispara a animação (queda)
        setTimeout(() => {
            // Move o confete para muito abaixo da tela, com rotação aleatória
            confetti.style.transform = `translateY(${window.innerHeight * 1.5}px) rotateZ(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        }, 10);

        // Remove o confete após a animação para limpar a tela
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000 + 100); // Remove depois da duração total da transição
    }
}

// Lógica para iniciar a chuva de confetes infinita
function startConfettiRain() {
    // Cria o primeiro lote imediatamente
    createConfettiDrop();

    // Continua criando lotes a cada 1.5 segundos
    confettiInterval = setInterval(createConfettiDrop, 1500);
}


function surpresa(){
    let quadrado = document.getElementById('quadrado')

    // 1. Transformar em gatinho (cabeça) e colocar a imagem
    quadrado.style.border = 'none'; // Retira as bordas
    quadrado.style.backgroundColor = 'transparent'; // Fundo transparente para a imagem
    quadrado.style.borderRadius = '50%'; // Cabeça redonda
    quadrado.style.width = '200px'; // Ajusta o tamanho
    quadrado.style.height = '200px';
    
    // Centraliza o conteúdo dentro do quadrado
    quadrado.style.display = 'flex';
    quadrado.style.alignItems = 'center';
    quadrado.style.justifyContent = 'center';

    // Adiciona a imagem do gatinho
    quadrado.innerHTML = `<img src="https://i.pinimg.com/originals/42/6f/f5/426ff52dd1ad41efc73298d98d7ede91.gif" alt="Gatinho Surpresa" style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;">`; 
    
    quadrado.style.fontSize = 'initial'; // Garante que o tamanho da fonte não interfira na imagem
    quadrado.style.lineHeight = 'initial'; // Garante que o line-height não interfira na imagem

    // 2. Fundo da página piscar colorido (festa)
    partyBackground();

    // 3. Cair confetes infinitos
    startConfettiRain();
}
