import { create } from "../controllers/tickets/create.js"
import { index } from "../controllers/tickets/index.js"
import { update } from "../controllers/tickets/update.js"
import { updateStatus } from "../controllers/tickets/updateStatus.js"
import { remove } from "../controllers/tickets/remove.js"

export const tickets = [
  {
    method: "POST",
    path: "/tickets",
    // Função que será executada quando a rota for chamada
    controller: create,
  },
  {
    method: "GET",
    path: "/tickets",
    // Função que será executada quando a rota for chamada
    controller: index,
  },
  {
    method: "PUT",
    path: "/tickets/:id",
    // Função que será executada quando a rota for chamada
    controller: update,
  },
  {
    method: "PATCH",
    path: "/tickets/:id/close",
    // Função que será executada quando a rota for chamada
    controller: updateStatus,
  },
  {
    method: "DELETE",
    path: "/tickets/:id",
    // Função que será executada quando a rota for chamada
    controller: remove,
  },
]
