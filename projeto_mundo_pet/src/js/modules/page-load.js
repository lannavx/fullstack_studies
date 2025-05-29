import { schedulesDay } from "./schedules/load-schedule.js"
import { dailySchedule } from "./schedules/daily-schedule.js"

// Executa as funções assim que o DOM estiver completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  // Carrega os horários disponíveis
  schedulesDay() 

  // Carrega os agendamentos do dia atual
  dailySchedule() 
})