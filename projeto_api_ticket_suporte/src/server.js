// Importa o módulo HTTP nativo do Node
import http from "node:http"

// Importa o middleware que processa o body da requisição
import { jsonHandler } from "./middlewares/jsonHandler.js"
import { routeHandler } from "./middlewares/routeHandler.js"

// Função executada a cada requisição
async function listener(request, response) {
  // Lê e processa o body
  await jsonHandler(request, response)
  // Identifica e executa a rota correta
  routeHandler(request, response)
}

// Cria o servidor e escuta na porta 3333
http.createServer(listener).listen(3333)
