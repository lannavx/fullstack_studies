import { currentDay } from "../../utils/current-day.js"
import { fetchDaySchedule } from "../../services/fetch-day-schedule.js"
import { showSchedule } from "./show-schedule.js"

// Seleciona o input de data
const selectDate = document.getElementById("current-day")

// Define a data atual e mínima no input
currentDay(selectDate)

// Executa o carregamento dos agendametos com base na data selecionada
export async function dailySchedule() {

  // Obtém a data atual selecionada pelo usuário
  const date = selectDate.value

  // Obtém a data atual selecionada pelo usuário
  const dailySchedules = await fetchDaySchedule({ date })

  // Exibe os agendamentos
  showSchedule({ dailySchedules })
}

// Carrega os agendamentos ao mudar a data
selectDate.onchange = () => dailySchedule()