// Controller responsável por atualizar um ticket existente
export function update({ request, response, database }) {
  // Extrai o ID da URL (ex: /tickets/:id)
  const { id } = request.params

  // Extrai os campos enviados no corpo da requisição
  const { equipment, description } = request.body

  // Atualiza o ticket no banco de dados com os novos valores
  database.update("tickets", id, {
    equipment,
    description,
    update_at: new Date(),
  })

  return response.end()
}
