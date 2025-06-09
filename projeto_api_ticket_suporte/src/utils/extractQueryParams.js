// Função que transforma uma query string (?chave=valor) em um objeto
export function extractQueryParams(query) {
  return query
    .slice(1)
    .split("&")
    .reduce((queryParams, param) => {
      const [key, value] = param.split("=")

      queryParams[key] = value

      return queryParams
    }, {})
}
