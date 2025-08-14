import styles from "./app.module.css"
import { useEffect, useState } from "react"

// Lista de palavras e dicas
import { WORDS } from "./utils/words"
import type { Challenge } from "./utils/words"

// Importa os componentes principais da interface do jogo
import { Header } from "./components/Header"
import { Tip } from "./components/Tip"
import { Letter } from "./components/Letter"
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { LetterUsed } from "./components/LettersUsed"
import type { LetterUsedProps } from "./components/LettersUsed"

export default function App() {
  // Controla a pontuação (quantidade de letras corretas)
  const [score, setScore] = useState(0)
  // Controla o valor digitado no input
  const [letter, setLetter] = useState("")
  // Armazena as letras já usadas e se estão corretas ou não
  const [lettersUsed, setLettersUsed] = useState<LetterUsedProps[]>([])
  // Armazena a palavra e dica atuais
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  // Margem extra de tentativas além do tamanho da palavra
  const ATTEMPT_MARGIN = 5

  // Reinicia o jogo após confirmação do usuário
  function handleRestartGame() {
    const isConfirmed = window.confirm("Deseja reiniciar o jogo?")

    if (isConfirmed) {
      startGame()
    }
  }

  // Inicia um jogo novo sorteando uma nova palavra e reseta os estados
  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length)
    const randomWord = WORDS[index]
    setChallenge(randomWord)

    setScore(0)
    setLetter("")
    setLettersUsed([])
  }

  // Confirma o palpite digitado pelo usuário
  function handleConfirm() {
    // Se não houver desafio não faz nada
    if (!challenge) {
      return
    }

    // Impede palpite vazio
    if (!letter.trim()) {
      return alert("Digite uma letra!")
    }

    // Padroniza as letras para maiúscula
    const value = letter.toUpperCase()
    const exists = lettersUsed.find(
      (used) => used.value.toLocaleUpperCase() === value
    )

    // Evita letra repetida
    if (exists) {
      setLetter("")
      return alert("Você já utilizou a letra " + value)
    }

    // Conta quantas vezes a letra aparece na palavra
    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length

    const correct = hits > 0
    const currentScore = score + hits

    // Adiciona a letra à lista de usadas
    setLettersUsed((prevState) => [...prevState, { value, correct }])
    setScore(currentScore)
    setLetter("")
  }

  // Finaliza o jogo mostrando uma mensagem e reinicia o mesmo
  function endGame(message: string) {
    alert(message)
    startGame()
  }

  // Executa ao carregar o componente para iniciar o jogo
  useEffect(() => {
    startGame()
  }, [])

  // Verifica a cada atualização se o jogo terminou com vitória ou derrota
  useEffect(() => {
    if (!challenge) {
      return
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame("Parabéns, você descobriu a palavra!")
      }

      const attemptLimit = challenge.word.length + ATTEMPT_MARGIN

      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena, você usou todas as tentativas!")
      }
    }, 200)
  }, [score, lettersUsed.length])

  // Enquanto não houver desafio não renderiza nada
  if (!challenge) {
    return
  }

  return (
    // Container principal da aplicação
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPT_MARGIN}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) =>
                used.value.toLocaleUpperCase() === letter.toLocaleUpperCase()
            )

            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            )
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />

          <Button title="Confirmar" onClick={handleConfirm} />
        </div>

        <LetterUsed data={lettersUsed} />
      </main>
    </div>
  )
}
