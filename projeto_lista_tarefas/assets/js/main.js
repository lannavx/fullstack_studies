const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// Função que cria um novo elemento <li>
function criaLi() {
    const li = document.createElement('li');
    return li;
}

// Adiciona um evento de teclado ao input de tarefa
// Esse evento é disparado quando o usuário pressiona uma tecla
inputTarefa.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        if (!inputTarefa.value) return;
        critaTarefa(inputTarefa.value);
    }
});

// Função que limpa o campo de input após adicionar a tarefa
function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus(); // Foca no input para o usuário poder digitar a próxima tarefa
}

// Função que cria o botão "Apagar" e o adiciona ao elemento <li>
function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('tittle', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

// Função principal que cria a tarefa com base no texto do input
function critaTarefa(textoInput) {
   const li = criaLi();
   li.innerText = textoInput;
   tarefas.appendChild(li);
   limpaInput();
   criaBotaoApagar(li);
   salvarTarefas();
}

// Evento que escuta o clique no botão de adicionar tarefa
btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    critaTarefa(inputTarefa.value);
});

document;addEventListener('click', function(event){
    const elemento = event.target; // Obtém o elemento que foi clicado
    
    // Verifica se o elemento clicado tem a classe "apagar"
    if (elemento.classList.contains('apagar')){
        elemento.parentElement.remove();
        salvarTarefas();
    }
});

// Função que salva as tarefas no localStorage
function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

     // Para cada tarefa <li>, extrai o texto e remove o botão "Apagar" antes de salvar
    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

// Função que recupera as tarefas salvas no localStorage e as adiciona à lista
function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    // Para cada tarefa no array, recria o item <li> na lista de tarefas
    for (let tarefa of listaDeTarefas) {
        critaTarefa(tarefa);
    }
}

// Chama a função para adicionar as tarefas salvas na inicialização da página
adicionaTarefasSalvas();