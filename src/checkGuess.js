// Lowercase, drop punctuation and collapse spaces so "Use-State!" matches "useState".
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function matches(guess, target) {
  const g = normalize(guess)
  const t = normalize(target)
  if (!g || !t) return false
  if (g === t) return true
  // Ignore spaces too, so "use state" matches "useState"
  if (g.replace(/ /g, '') === t.replace(/ /g, '')) return true
  // A partial answer counts if it is made of whole words from the target ("lifting state" for "lifting state up")
  if (g.length >= 4 && ` ${t} `.includes(` ${g} `)) return true
  // A guess that contains the full answer as whole words counts too ("the virtual dom")
  return ` ${g} `.includes(` ${t} `)
}

export default function checkGuess(guess, card) {
  return [card.answer, ...(card.accept ?? [])].some((target) => matches(guess, target))
}
