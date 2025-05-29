import { apiConfig } from "./api-config.js"

const modalContainer = document.getElementById("modal-container")

// Envia um novo agendamento para a API
export async function newSchedule({ id, pet, name, service, when}) {
  try {
    // Faz a requisição POST para criar um novo agendamento
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Converte o objeto para JSON
      body: JSON.stringify({id, pet, name, service, when}),
    })

    // Fecha o modal e após 600ms, exibe alerta de sucesso rolando a página para o topo
    modalContainer.classList.toggle("hidden")    
    setTimeout(() => {
      alert("Agendamento realizado com sucesso!")
      window.scrollTo(0, 0)  
    }, 550)
    

  } catch (error) {
    console.log(error)
    alert("Não foi possível agendar. Por favor, Tente novamente mais tarde.")
  }
}