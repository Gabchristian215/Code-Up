import { useState } from 'react'
import './Flashcard.css'

export default function Flashcard({ question, answer, status }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <button
      className={`flashcard ${isFlipped ? 'flipped' : ''} ${status ?? ''}`}
      onClick={() => setIsFlipped((flipped) => !flipped)}
      aria-label={isFlipped ? 'Show question' : 'Show answer'}
    >
      <span className="card-face card-front">
        <span className="card-label">Question</span>
        {question}
      </span>
      <span className="card-face card-back">
        <span className="card-label">Answer</span>
        {answer}
      </span>
    </button>
  )
}
