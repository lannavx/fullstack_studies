document.addEventListener('DOMContentLoaded', () => {
    const setaDireita = document.getElementById("setaDireita");
    const setaEsquerda = document.getElementById("setaEsquerda");
    const imagens = document.querySelectorAll(".imagens-carrossel img");
    let currentIndex = 0;

    function mostrarImagem(index) {
        imagens.forEach((img, i) => {
            img.style.display = i === index ? "block" : "none";
        });
    }

    function passaParaDireita() {
        currentIndex = (currentIndex + 1) % imagens.length;
        mostrarImagem(currentIndex);
    }

    function passaParaEsquerda() {
        currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
        mostrarImagem(currentIndex);
    }

    setaDireita.addEventListener("click", passaParaDireita);
    setaEsquerda.addEventListener("click", passaParaEsquerda);

    // Inicializa o carrossel mostrando a primeira imagem
    mostrarImagem(currentIndex);

    // Define um intervalo para passar automaticamente para a próxima imagem a cada 3 segundos
    setInterval(passaParaDireita, 3000);
});
