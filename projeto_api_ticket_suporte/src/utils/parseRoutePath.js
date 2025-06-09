// Converte um caminho de rota com parâmetros para uma expressão regular
export function parseRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z_]+)/g

  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)")

  const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`)

  // Retorna a regex pronta pra ser usada no match de rota
  return pathRegex
}
