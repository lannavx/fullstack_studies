// Seleciona os elementos do formulário
const form = document.querySelector("form")
const qtyNumber = document.getElementById("qty-number")
const startNumber = document.getElementById("start-number")
const endNumber = document.getElementById("end-number")
const toggleButton = document.getElementById("toggle-button")
const buttonDraw = document.getElementById("button-draw")

// Seleciona as seções de sorteio e resultado
const drawSection = document.getElementById("draw-section")
const result = document.getElementById("result")
const buttonReset = document.getElementById("button-reset")
const square = document.querySelector(".square")

// Variável para verificação booleana do botão toggle
let forbidDuplicates = false

// Evento que captura o mudança do botão toggle
toggleButton.addEventListener("change", () => {
  // Atualiza o valor da variável com base no estado do checkbox
  if(toggleButton.checked) {
    forbidDuplicates = true
  } else {
    forbidDuplicates = false
  }
})

// Evento que caputura o click do botão para reiniciar o sorteio
buttonReset.addEventListener("click", (e) => {
  // Previne o comportamento padrão de recarregar a página
  e.preventDefault();

  // Mostra o formulário novamente e esconde os resultados
  drawSection.classList.remove("hidden") 
  result.classList.add("hidden")

  // Limpa a lista de números sorteados
  drawnNumbers = []
})

// Armazena os números sorteados
let drawnNumbers = []

// Armazena a quantidade de submits
let countSubmit = 0

// Captura o evento de submit do formulário
form.addEventListener("submit", (e) => {

  // Previne o comportamento padrão de recarregar a página
  e.preventDefault()
  
  // Converte os valores dos inputs para números
  let valueQtyNumber = parseInt(qtyNumber.value, 10)
  let valueStart = parseInt(startNumber.value, 10)
  let valueEnd = parseInt(endNumber.value, 10)
  
  // Lista para armazenar os possiveis números para sorteio
  let numbersList = []
  
  // Verifica se a entrada dos números é válida
  if(valueStart >= valueEnd) {
    alert("O número de inicio não pode ser maior ou igual ao número final")
    formClear()
    return;
  } else {
    // Condição caso permita números repetidos no sorteio
    if(!forbidDuplicates) {
  
      // Preenche a lista com números aleatórios dentro do intervalo
      for(let i = valueStart; i <= valueEnd; i++) {
        numbersList.push(getRandomInt(valueStart, valueEnd + 1))
      }
  
      // Sorteia os números com repetição
      for(let i = 0; i <= valueQtyNumber - 1; i++) {
        // Seleciona um número aleatório da lista e adiciona aos sorteados
        const randomNumber = numbersList[randomIndex(numbersList)]
        drawnNumbers.push(randomNumber)
      }
    } else {
  
      // Se o número de sorteio for maior que o intervalo, exibe alerta
      if (valueQtyNumber > valueEnd) {
        alert("Não é possível sortear essa quantidade sem repetir números. Por favor, forneça um interalo válido para a quantidade de números solicitada");
        // Limpa o formulário
        formClear()
        return;
      }
  
      // Preenche a lista com todos os números do intervalo (sem repetições)
      for(let i = valueStart; i <= valueEnd; i++) {
        numbersList.push(i)
      }
  
      // Sorteia os números sem repetição
      for(let i = 0; i <= valueQtyNumber - 1; i++) {
        // Pega um índice aleatório
        const index = randomIndex(numbersList)
  
        // Remove o número da lista e obtém seu valor e adiciona aos sorteados
        const number = numbersList.splice(index, 1)[0]
        drawnNumbers.push(number)
      }
    }
  }

  // Exibe o resultado
  result.classList.remove("hidden");
  drawSection.classList.add("hidden");

  // Limpa os inputs do formulário
  formClear()

  // Exibe os números sorteados
  numberAdd()

  // Conta as vezes que o evento de submit foi realizado
  countSubmit++

  // Exibe a numeração atualizada do resultado
  numResultAtt()
})

// Atualiza a numeração do resultado
function numResultAtt() {
  // Seleciona a div do titulo do resultado
  const resultTitle = document.getElementById("result-title")

  // Seleciona o elemento p dentro do container principal
  const p = resultTitle.querySelector("p")

  // Insere a contagem dentro da tag p
  p.innerHTML = `${countSubmit}º Resultado`
}

// Adiciona os números sorteados ao HTML
function numberAdd() {
  // Seleciona a div dos resultados
  const resultContainer = document.getElementById("drawn-result")
  
  // Limpa resultados anteriores
  resultContainer.innerHTML = ""

  // Percore por cada número sorteado e adiciona os elementos nas tags HTML
  drawnNumbers.forEach((num) => {

    // Cria um contêiner do item  
    const item = document.createElement("div")
    item.classList.add("result-item")

    // Cria um quadrado visual 
    const square = document.createElement("div")
    square.classList.add("square")

    // Cria o elemento <p> para o número sorteado e define o número sorteado como conteúdo
    const p = document.createElement("p")
    p.classList.add("number")
    p.innerHTML = num

    // Adiciona os elementos ao item
    item.appendChild(square)
    item.appendChild(p)

    // Adiciona item ao container principal
    resultContainer.appendChild(item)
  })
}

// Retorna um número aleatorio entre um minimo e um máximo
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Retorna um indice aleatorio de um array
function randomIndex(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Limpa os inputs do formulário
function formClear() {
  qtyNumber.value = ""
  startNumber.value = ""
  endNumber.value = ""
}
