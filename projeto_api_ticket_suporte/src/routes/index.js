import { tickets } from "./tickets.js"
import { parseRoutePath } from "../utils/parseRoutePath.js"

// Monta o array de rotas, convertendo os caminhos para regex
export const routes = [...tickets].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}))
