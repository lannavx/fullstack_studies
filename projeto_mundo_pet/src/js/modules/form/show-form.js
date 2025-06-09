const btnShowForm = document.getElementById("new-schedule")
const formsModal = document.getElementById("modal-container")
const btnCloseForm = document.getElementById("close-modal-form")

// Abre o formulário ao clicar em novo agendamento e sobe a tela para o topo
btnShowForm.addEventListener("click", () => {
  formsModal.classList.toggle("hidden")
  formsModal.scrollIntoView({ behavior: 'smooth' });
})


// Fecha o formulário ao clicar no botão
btnCloseForm.addEventListener("click", () => {
  formsModal.classList.toggle("hidden")
})