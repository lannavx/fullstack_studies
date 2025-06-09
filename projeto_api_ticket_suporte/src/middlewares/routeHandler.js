import { routes } from "../routes/index.js"
import { Database } from "../database/databse.js"
import { extractQueryParams } from "../utils/extractQueryParams.js"

// Instancia a base de dados
const database = new Database()

// Função que procura e executa a rota correta com base no método e na URL
export function routeHandler(request, response) {
  // Busca uma rota que tenha o mesmo método e caminho(regex) da requisição
  const route = routes.find((route) => {
    return route.method === request.method && route.path.test(request.url)
  })

  if (route) {
    // Extrai os parâmetros nomeados da URL e a query string, se houver
    const routeParams = request.url.match(route.path)
    const { query, ...params } = routeParams.groups

    // Injeta os parâmetros da rota (ex: id) na requisição
    request.params = params
    // Injeta os parâmetros de query string (se houver)
    request.query = query ? extractQueryParams(query) : {}

    // Executa o controller da rota
    return route.controller({ request, response, database })
  }

  // Se não encontrou rota, responde com erro 404
  return response.writeHead(404).end()
}
