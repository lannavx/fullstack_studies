// Controller que finaliza um ticket, atualizando o status para "closed" e registrando a solução
export function updateStatus({ request, response, database }) {
  // Extrai o ID do ticket da URL (ex: /tickets/:id/status)
  const { id } = request.params

  // Extrai a solução enviada no corpo da requisição
  const { solution } = request.body

  // Atualiza o ticket no banco com status "closed" e adiciona a solução
  database.update("tickets", id, { status: "closed", solution })

  // Finaliza a resposta sem conteúdo
  return response.end()
}
