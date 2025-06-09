import { removeSchedule } from "../../services/remove-schedule.js"
import { dailySchedule } from "./daily-schedule.js"

const periods = document.querySelectorAll("ul")

// Gera evento de click para cada lista
periods.forEach((period) => {
  // Captura o evento de clique na lista
  period.addEventListener("click", async (e) => {
    if(e.target.classList.contains("btn-remove")){
      // Obtém o elemento li mais próximo
      const item = e.target.closest("li")

      // Obtém o ID do agendamento para remoção
      const { id } = item.dataset

      // Se o ID existir confirma a remoção
      if(id) {
        const isConfirm = confirm("Deseja seguir com a remoção do agendamento?")
        
        // Se confirmado executa a lógica de exclusão do agendamento
        if(isConfirm) {
          await removeSchedule({ id })

          // Recarrega os agendamentos
          dailySchedule()
        }
      }
    }
  })
})