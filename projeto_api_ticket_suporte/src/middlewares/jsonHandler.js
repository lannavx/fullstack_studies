// Middleware que lê o body da requisição e transforma em JSON
export async function jsonHandler(request, response) {
  // Array para armazenar os pedaços (chunks) da requisição
  const buffers = []

  // Recebe os pedaços do body em stream
  for await (const chunk of request) {
    buffers.push(chunk)
  }

  try {
    // Junta os pedaços, converte pra string e faz parse pra JSON
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    // Se der erro no JSON, body fica como null
    request.body = null
  }

  // Define que a resposta será no formato JSON
  response.setHeader("Content-Type", "application/json")
}
