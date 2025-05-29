const phoneInput = document.getElementById("phone-number")

phoneInput.addEventListener("input", (e) => {

  // Pega o valor atual do input
  let value = e.target.value

  // Remove tudo que não for número
  value = value.replace(/\D/g, '')

  // Limita a 11 dígitos 
  value = value.slice(0, 11)

  // Coloca os parênteses no DDD
  value = value.replace(/^(\d{2})(\d)/, '($1) $2')

  // Coloca o traço depois do quinto dígito
  value = value.replace(/(\d{5})(\d)/, '$1-$2')

  // Atualiza o valor do input
  e.target.value = value
})


