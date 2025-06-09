import dayjs from "dayjs"
import { appointmentHours } from "../../utils/hours.js"

const hours = document.getElementById("hours")

// Carrega e renderiza os horários disponíveis com base na data e nos agendamentos do dia
export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista de horários
  hours.innerHTML = ""

  // Obtém a lista de horários já agendados
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  )

  // Mapeia os horários, verificando se estão disponíveis
  const scale = appointmentHours.map((hour) => {

    // Recupera somente a hora(H)
    const [ schedules, _ ] = hour.split(":")

    // Verifica se a hora está no passado
    const isHourPast = dayjs(date).add(schedules, "hour").isBefore(dayjs())

    // Define como disponível se não estiver agendado nem for horário passado
    const available = !unavailableHours.includes(hour) && !isHourPast

    // Retorna objeto com o horário e disponibilidade
    return {
      hour,
      available,
    }
  })

  // Cria e insere as opções de horário no select
  scale.forEach(({ hour, available }) => {
    const option = document.createElement("option")

    // Adiciona classes conforme disponibilidade
    option.classList.add("hour")
    option.classList.add(available ? "hour-available" : "hour-unavailable")

    // Desabilita a option se o horário não estiver disponível
    if (option.classList.contains("hour-unavailable")) {
      option.disabled = true;
    }

    // Define o texto da option
    option.textContent = hour

    // Adiciona option ao select de horários
    hours.appendChild(option)
  })
}