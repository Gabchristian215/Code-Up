import { useState } from 'react'
import './App.css'
import Flashcard from './components/Flashcard.jsx'
import cards from './cards.js'
import checkGuess from './checkGuess.js'

function shuffled(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function App() {
  const [order, setOrder] = useState(cards)
  const [masteredIds, setMasteredIds] = useState([])
  const [index, setIndex] = useState(0)
  const [guess, setGuess] = useState('')
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [currentStreak, setCurrentStreak] = useState(0)
  const [longestStreak, setLongestStreak] = useState(0)

  const deck = order.filter((card) => !masteredIds.includes(card.id))
  const mastered = cards.filter((card) => masteredIds.includes(card.id))
  const card = deck[index]
  const isFirst = index === 0
  const isLast = index >= deck.length - 1

  function goTo(newIndex) {
    setIndex(newIndex)
    setGuess('')
    setFeedback(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!guess.trim() || feedback === 'correct') return

    if (checkGuess(guess, card)) {
      setFeedback('correct')
      const streak = currentStreak + 1
      setCurrentStreak(streak)
      setLongestStreak(Math.max(longestStreak, streak))
    } else {
      setFeedback('wrong')
      setCurrentStreak(0)
    }
  }

  function handleShuffle() {
    setOrder(shuffled(cards))
    goTo(0)
  }

  function handleMaster() {
    setMasteredIds([...masteredIds, card.id])
    // Stay at the same position so the next card slides in; step back if this was the last one
    goTo(Math.max(0, Math.min(index, deck.length - 2)))
  }

  function handleReset() {
    setOrder(cards)
    setMasteredIds([])
    setCurrentStreak(0)
    setLongestStreak(0)
    goTo(0)
  }

  return (
    <>
      <h1>Code Up</h1>
      <p>How well do you know React? Type your answer, then flip the card to check.</p>
      <p className="stats">
        Cards left: {deck.length} / {cards.length}
        <span className="streak">Current streak: {currentStreak}</span>
        <span className="streak">Longest streak: {longestStreak}</span>
      </p>

      {card ? (
        <>
          <p className="position">
            Card {index + 1} of {deck.length}
          </p>
          <Flashcard key={card.id} question={card.question} answer={card.answer} status={feedback} />

          <form className="guess-form" onSubmit={handleSubmit}>
            <label htmlFor="guess">Your guess:</label>
            <input
              id="guess"
              type="text"
              placeholder="Type your answer…"
              autoComplete="off"
              value={guess}
              disabled={feedback === 'correct'}
              className={feedback ?? ''}
              onChange={(event) => {
                setGuess(event.target.value)
                if (feedback === 'wrong') setFeedback(null)
              }}
            />
            <button type="submit" disabled={feedback === 'correct'}>
              Submit
            </button>
          </form>
          <p className={`feedback ${feedback ?? ''}`} role="status">
            {feedback === 'correct' && '✅ Correct! Nice work.'}
            {feedback === 'wrong' && '❌ Not quite. Try again or flip the card.'}
          </p>

          <div className="controls">
            <button aria-label="Previous card" disabled={isFirst} onClick={() => goTo(index - 1)}>
              ←
            </button>
            <button onClick={handleShuffle}>Shuffle</button>
            <button onClick={handleMaster}>Mark as mastered</button>
            <button aria-label="Next card" disabled={isLast} onClick={() => goTo(index + 1)}>
              →
            </button>
          </div>
        </>
      ) : (
        <div className="all-done">
          <h2>You mastered every card! 🎉</h2>
          <button onClick={handleReset}>Start over</button>
        </div>
      )}

      {mastered.length > 0 && (
        <section className="mastered">
          <h2>Mastered cards ({mastered.length})</h2>
          <ul>
            {mastered.map((m) => (
              <li key={m.id}>
                <strong>{m.answer}</strong> — {m.question}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
