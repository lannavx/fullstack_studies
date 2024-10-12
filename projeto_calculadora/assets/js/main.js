// Constructor Function

function Calculadora() {
  // Seleciona o elemento com a classe 'display', onde os números e operações são exibidos
  this.display = document.querySelector('.display');

  // Inicia a calculadora, chamando os métodos de captura de cliques e de enter
  this.inicia = () => {
    this.capturaCliques();
    this.caputraEnter();
  };

  // Método que captura o pressionar da tecla 'Enter' para realizar o cálculo
  this.caputraEnter = () => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.realizaConta();
      }
    });
  }

  // Método que captura os cliques nos botões da calculadora
  this.capturaCliques = () => {
    document.addEventListener('click', event => {
      const el = event.target;  // Obtém o elemento que foi clicado

      if(el.classList.contains('btn-num')) this.addNumDisplay(el);
      if(el.classList.contains('btn-clear')) this.clear();
      if(el.classList.contains('btn-del')) this.del();
      if(el.classList.contains('btn-eq')) this.realizaConta();
    });
  };

  // Método que realiza o cálculo exibido no display
  this.realizaConta = () => {
    try {
      const conta = eval(this.display.value);

      // Se o cálculo for inválido, exibe um alerta e não altera o display
      if(!conta) {
        alert('Conta inválida');
        return;
      }

      // Se o cálculo for válido, exibe o resultado no display
      this.display.value = conta;

      // Se houver um erro durante a avaliação do cálculo, exibe um alerta
    } catch(e) {
      alert('Conta inválida');
      return;
    }
  };

  // Método que adiciona o número clicado no display
  this.addNumDisplay = el => {
    this.display.value += el.innerText;
    this.display.focus(); // Foca no display, para que o usuário possa continuar digitando
  };

  // Método que limpa o display (quando o botão 'clear' é clicado)
  this.clear = () => this.display.value = '';
  // Método que apaga o último número digitado 
  this.del = () => this.display.value = this.display.value.slice(0,-1);

}

// Instancia uma nova Calculadora
const calculadora = new Calculadora();

// Inicia a calculadora
calculadora.inicia();