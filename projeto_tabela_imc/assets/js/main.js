
const form = document.querySelector('#formulario');

form.addEventListener('submit', function (event) {
    
    // Previne o comportamento padrão de recarregar a página ao enviar o formulário
    event.preventDefault(); 

    // Seleciona os inputs de peso e altura pelo ID
    const inputPeso = event.target.querySelector('#peso');
    const inputAltura = event.target.querySelector('#altura');
   
    // Converte os valores dos inputs para números
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Verifica se o peso é válido 
    if (!peso) {
        setResultado('Peso inválido', false);
        return;
    }

    // Verifica se a altura é válida 
    if (!altura) {
        setResultado('Altura inválida', false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    // Cria a mensagem de resultado
    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(msg, true);
});

// Função que retorna o nível correspondente ao valor do IMC
function getNivelImc (imc) {
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
     'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

// Função que calcula o IMC a partir do peso e altura fornecidos
function getImc (peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

// Função que cria um elemento parágrafo <p>
function criaP () {
    const p = document.createElement('p');
    return p;
}

// Função que exibe o resultado na tela
function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado')
    resultado.innerHTML = '';
    
    const p = criaP();

    // Adiciona uma classe ao parágrafo dependendo se o resultado é válido ou não    
    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('incorreto');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}