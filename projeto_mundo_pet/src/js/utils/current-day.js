import dayjs from "dayjs"

// Carrega a data atual e define a data mínima como sendo a data atual
export function currentDay(date) {
  
  // Obtém a data atual formatada para o input
  const inputToday = dayjs(new Date()).format("YYYY-MM-DD")
  
  date.value = inputToday
  date.min = inputToday
}