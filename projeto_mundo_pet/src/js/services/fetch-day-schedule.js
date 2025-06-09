import dayjs from "dayjs"
import { apiConfig } from "./api-config"

// Busca os agendamentos do dia selecionado
export async function fetchDaySchedule({ date }) {
  try {
    // Faz a requisição para obter todos os agendamentos
    const response = await fetch(`${apiConfig.baseURL}/schedules`)
    
    // Converte para JSON
    const data = await response.json()
  
    // Filtra o agendamento pelo dia selecionado
    const dailySchedules = data.filter((schedule) => 
      dayjs(date).isSame(schedule.when, "day")
    )

    // Retorna os agendamentos filtrados
    return dailySchedules

  } catch(error) {
    console.log(error)
    alert("Não foi possível buscar os agendamentos do dia selecionado. Por favor, tente novamente mais tarde")
  }
}