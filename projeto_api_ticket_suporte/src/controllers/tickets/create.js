import { randomUUID } from "node:crypto"

// Controller que lida com a criação de um ticket
export function create({ request, response, database }) {
  // Extrai os dados enviados no body da requisição
  const { equipment, description, user_name } = request.body

  // Cria o objeto ticket com as informações recebidas
  const ticket = {
    id: randomUUID(),
    equipment,
    description,
    user_name,
    status: "open",
    created_at: new Date(),
    updated_at: new Date(),
  }

  // Insere o novo dado(ticket) na tabela tickets do arquivo db.json
  database.insert("tickets", ticket)

  // Retorna a resposta com status 201 e os dados em JSON
  return response.writeHead(201).end(JSON.stringify(ticket))
}
