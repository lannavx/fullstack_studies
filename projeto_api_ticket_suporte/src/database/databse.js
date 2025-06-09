// Importa funções para leitura e escrita de arquivos de forma assíncrona
import fs from "node:fs/promises"

// Define o caminho completo do arquivo db.json
const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
  // Objeto privado que armazena os dados da aplicação em memória
  #database = {}

  constructor() {
    // Tenta ler o conteúdo do arquivo db.json ao iniciar
    fs.readFile(DATABASE_PATH, "utf8")
      // Converte o conteúdo JSON para objeto
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      // Se o arquivo não existir ou der erro, cria um novo arquivo vazio
      .catch(() => {
        this.#persist()
      })
  }

  // Método privado que salva o conteúdo atual do #database no arquivo db.json
  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
  }

  // Insere um novo item na tabela especificada dentro do bd
  insert(table, data) {
    // Verifica se a tabela já existe e é um array
    if (Array.isArray(this.#database[table])) {
      // Se sim, adiciona o novo dado ao final da lista
      this.#database[table].push(data)
      // Se não, cria a tabela com o dado como primeiro item
    } else {
      this.#database[table] = [data]
    }
    // Salva as alterações no arquivo
    this.#persist()
  }

  // Retorna todos os dados da tabela com ou sem filtros aplicados
  select(table, filters) {
    let data = this.#database[table] ?? []

    // Se filtros foram passados, aplica o filtro
    if (filters) {
      // Filtra os dados conforme os filtros passados (ex: status=open)
      data = data.filter((row) => {
        // Para cada item da tabela, verifica se pelo menos um filtro bate
        return Object.entries(filters).some(([key, value]) => {
          // Verifica se o valor do campo inclui o valor do filtro
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
    return data
  }

  // Atualiza um item com base no ID dentro da tabela especificada
  update(table, id, data) {
    // Encontra o índice do item com o ID correspondente
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      // Mescla os dados antigos com os novos
      this.#database[table][rowIndex] = {
        ...this.#database[table][rowIndex],
        ...data,
      }

      // Salva a atualização no arquivo
      this.#persist()
    }
  }

  // Remove um item da tabela com base no ID
  delete(table, id) {
    // Encontra o índice do item com o ID correspondente
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      // Remove o item do array usando splice
      this.#database[table].splice(rowIndex, 1)

      // Salva a alteração no arquivo db.json
      this.#persist()
    }
  }
}
