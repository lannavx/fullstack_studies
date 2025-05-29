import { hoursLoad } from "../form/hours-load.js";
import { fetchDaySchedule } from "../../services/fetch-day-schedule.js"

// Seleciona o input de data
const selectedDate = document.getElementById("date")

// Executa o carregamento dos horários com base na data selecionada
export async function schedulesDay() {

  // Obtém a data do input
  const date = selectedDate.value

  // Busca os agendamentos do dia na API
  const dailySchedules = await fetchDaySchedule({ date })

  // Chama a função que carrega os horários disponíveis para a data e os agendamentos
  hoursLoad({ date, dailySchedules })
}

// Carrega os horários disponíveis ao mudar a data
selectedDate.onchange = () => schedulesDay()
