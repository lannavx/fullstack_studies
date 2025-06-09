// Controller responsável por remover um ticket do banco de dados
export function remove({ request, response, database }) {
  // Extrai o ID do ticket da URL (ex: /tickets/:id)
  const { id } = request.params

  // Remove o ticket da base de dados
  database.delete("tickets", id)

  // Finaliza a resposta sem conteúdo
  return response.end()
}
