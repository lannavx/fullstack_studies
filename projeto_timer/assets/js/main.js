function relogio() {

    // Converte segundos em uma string de horas, minutos e segundos no formato 'HH:MM:SS
    function getTimeFromSeconds(segundos) {
        const data = new Date(segundos * 1000);
        return data.toLocaleTimeString('pt-BR', {
            hour12: false,
            timeZone: 'UTC'
        });
    }
    
    const relogio = document.querySelector('.relogio');
    let segundos = 0;
    let timer; // Variável que armazenará o ID do intervalo para controle do temporizador
    
    // Função que inicia o relógio, incrementando os segundos a cada 1 segundo
    function startClock() {
        timer = setInterval(function() {
            segundos++;
            relogio.innerHTML = getTimeFromSeconds(segundos);
        }, 1000);
    }
    
    // Captura cliques em qualquer lugar da página
    document.addEventListener('click', function(event) {
        const elemento = event.target;  // Armazena o elemento clicado do evento
       
        // Se o elemento clicado tiver a classe 'zerar', o relógio é zerado
        if(elemento.classList.contains('zerar')) {
            clearInterval(timer); // Para o temporizador
            relogio.innerHTML = '00:00:00'
            relogio.classList.remove('pausado');
            segundos = 0;
        }
       
        // Se o elemento clicado tiver a classe 'iniciar', o relógio é iniciado
        if(elemento.classList.contains('iniciar')) {
            relogio.classList.remove('pausado');
            // Limpa o intervalo anterior antes de iniciar um novo
            clearInterval(timer);
            startClock();
        }
    
        // Se o elemento clicado tiver a classe 'pausar', o relógio é pausado
        if(elemento.classList.contains('pausar')) {
            // Para o temporizador, mantendo o valor atual de segundos
            clearInterval(timer);
            relogio.classList.add('pausado');
        }
    });
}

// Chama a função para iniciar o relógio quando a página for carregada
relogio();

