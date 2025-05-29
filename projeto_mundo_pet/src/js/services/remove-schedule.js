import { apiConfig } from "./api-config.js"

// Remove um agendamento da API baseado no ID
export async function removeSchedule({ id }) {
  try {
    // Faz a requisição DELETE para remover o agendamento
    await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    })
    alert("Agendamento cancelado com sucesso!")

    // Exibe mensagem de falha ao usuário
  } catch (error) {
    console.log(error)
    alert("Não foi possível cancelar o agendamento")
  }
}