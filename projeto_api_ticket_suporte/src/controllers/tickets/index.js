// Controller que retorna a lista de todos os tickets cadastrados com ou sem filtro
export function index({ request, response, database }) {
  const { status } = request.query

  // Se houver query string cria objeto de filtro
  const filters = status ? { status } : null

  // Recupera os tickets da base de dados, com filtro se existir
  const tickets = database.select("tickets", filters)

  // Retorna os dados em formato JSON na respostas
  return response.end(JSON.stringify(tickets))
}
