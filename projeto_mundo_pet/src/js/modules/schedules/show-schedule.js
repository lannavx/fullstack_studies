import dayjs from "dayjs"

// Seleciona os periodos (manhã, tarde, noite)
const periodMorning = document.getElementById("morning")
const periodAfternoon = document.getElementById("afternoon")
const periodNight = document.getElementById("night")

// Exibe os agendamentos organizados por período
export function showSchedule({ dailySchedules }) {
  try {
    // Limpa o conteúdo atual de cada período
    periodMorning.innerHTML = ""
    periodAfternoon.innerHTML = ""
    periodNight.innerHTML = ""

    // Renderizar os agendamentos por período
    dailySchedules.forEach(schedule => {

      // Cria o elemento da lista de agendamento
      const item = document.createElement("li")

      // Cria o contêiner para informações do cliente
      const containerClient = document.createElement("div")
      const time = document.createElement("strong")
      const customer = document.createElement("p")

      // Define o conteúdo do cliente
      customer.innerHTML = `<strong>${schedule.pet}</strong> / ${schedule.name}`
      containerClient.classList.add("client")

      // Define o horário formatado(HH:mm)
      time.textContent = dayjs(schedule.when).format("HH:mm")
      
      // Adiciona horário e informações do cliente ao contêiner
      containerClient.append(time, customer)

      // Exibe e define o serviço do agendamento
      const service = document.createElement("p")
      service.textContent = schedule.service

      // Cria botão de remoção do agendamento
      const removeContainer = document.createElement("div")
      removeContainer.classList.add("remove")

      const removeButton = document.createElement("button")
      removeButton.textContent = "Remover agendamento"
      removeButton.classList = "btn-remove"
      removeContainer.append(removeButton)

      // Adiciona o ID do agendamento no elemento da lista
      item.setAttribute("data-id", schedule.id)

      // Adiciona todos os elementos a lsita
      item.append(containerClient, service, removeContainer)

      // Obtém a hora para determinar o período
      const hour = dayjs(schedule.when).hour()

      // Renderiza o agendamento na sessão conforme o período
      if(hour <= 12) {
        // Se já existir agendamento, adiciona linha divisória
        if (periodMorning.children.length > 0) {
          insertLine(periodMorning)
        }
        // Adiciona o agendamento ao período determinado
        periodMorning.appendChild(item)

      } else if (hour > 12 && hour <= 18) {
        if (periodAfternoon.children.length > 0) {
          insertLine(periodAfternoon)
        }
        periodAfternoon.appendChild(item)
      } else {
        if (periodNight.children.length > 0) {
          insertLine(periodNight)
        }
        periodNight.appendChild(item)
      }
    });

   // Exibe mensagem de erro  
  } catch (error) {
    alert("Não foi possível exibir os agendamentos")
    console.log(error)
  }
}

// Função que insere uma linha divisória entre os agendamentos
const insertLine = (period) => {
  const line = document.createElement("div")

  line.classList.add("line")
  period.appendChild(line)
}