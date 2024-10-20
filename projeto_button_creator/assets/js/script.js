// Seleciona os elementos que serão manipulados
const controles = document.getElementById('controles');
const cssText = document.querySelector('.css');
const btn = document.querySelector('.btn');

// Adiciona um listener no formulário para monitorar as alterações nos inputs
controles.addEventListener('change', handleChange);

// Objeto responsável por aplicar os estilos no botão. Cada propriedade mapeia uma função de estilo correspondente
const handleStyle = {
  element: btn,
  backgroundColor(value) {
    this.element.style.backgroundColor = value;
  },
  height(value) {
    this.element.style.height = value + 'px';
  },
  width(value) {
    this.element.style.width = value + 'px';
  },
  texto(value) {
    this.element.innerText = value;
  },
  color(value) {
    this.element.style.color = value;
  },
  border(value) {
    this.element.style.border = value;
  },
  borderRadius(value) {
    this.element.style.borderRadius = value + 'px';
  },
  fontFamily(value) {
    this.element.style.fontFamily = value;
  },
  fontSize(value) {
    this.element.style.fontSize = value + 'rem';
  },
}

// Função chamada sempre que um input do formulário é alterado
function handleChange(event) {
  const name = event.target.name;   
  const value = event.target.value; 

  handleStyle[name](value);
  saveValues(name, value);
  showCss();
}

// Salva o valor no localStorage, garantindo que as alterações sejam mantidas
function saveValues(name, value) {
  localStorage[name] = value;
}

// Recupera os valores salvos no localStorage e aplica no botão
function setValues() {
  const properties = Object.keys(localStorage); // Obtém as chaves (propriedades) armazenadas no localStorage
  
  // Aplica os valores armazenados no botão e atualiza os inputs do formulário
  properties.forEach(propertie => {
    handleStyle[propertie](localStorage[propertie]);
    controles.elements[propertie].value = localStorage[propertie];
  });
  showCss(); // Atualiza a exibição do CSS ao carregar os estilos salvos
}

setValues();

// Exibe o CSS aplicado ao botão de forma legível
function showCss() {
  cssText.innerHTML = '<span>' + btn.style.cssText.split('; ').join(';</span><span>');
}