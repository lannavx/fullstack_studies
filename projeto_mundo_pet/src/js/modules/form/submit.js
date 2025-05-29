import dayjs from "dayjs"
import { currentDay } from "../../utils/current-day.js"
import { newSchedule } from "../../services/new-schedule.js"
import { schedulesDay } from "../schedules/load-schedule.js"
import { dailySchedule } from "../schedules/daily-schedule.js"

// Seleciona os elementos do formulário
const form = document.querySelector("form")
const selectedDate = document.getElementById("date")
const tutorName = document.getElementById("tutor-name")
const petName = document.getElementById("pet-name")
const phoneTutor = document.getElementById("phone-number")
const seriveDescrip = document.getElementById("service-description")
const selectedHour = document.getElementById("hours")

// Define a data atual e mínima no input de data
currentDay(selectedDate)

form.onsubmit = async (e) => {
  // Previne o comportamento padrão de carregamento da página
  e.preventDefault()

  try {
    // Recupera os valores dos inputs e remove espaços extras
    const name = tutorName.value.trim()
    const pet = petName.value.trim()
    const service = seriveDescrip.value.trim()
  
    // Recupera somente a hora selecionada
    const [hour] = selectedHour.value.split(":")

    // Insere a hora selecionada na data para criar o agendamento completo
    const when = dayjs(selectedDate.value).add(hour, "hour")

    // Gera um ID
    const id = new Date().getTime().toString()

    // Envia o novo agendamento para a API
    await newSchedule({
      id, 
      pet,
      name, 
      service,
      when,
    })

    // Recarrega os agendamentos
    await dailySchedule()
    await schedulesDay()

    // Limpa os inputs
    tutorName.value = ""
    petName.value = ""
    phoneTutor.value = ""
    seriveDescrip.value = ""

  // Exibe alerta no caso de erro no processo de agendamento  
  } catch (error) {
    alert("Não foi possível realizar o agendamento.")
    console.log(error)
  }
}