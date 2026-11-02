// Answers are kept short so they can be typed as a guess.
// `accept` lists other answers that also count as correct.
const cards = [
  {
    id: 1,
    question: 'Which hook adds state to a function component?',
    answer: 'useState',
  },
  {
    id: 2,
    question: 'Which hook runs side effects after a render?',
    answer: 'useEffect',
  },
  {
    id: 3,
    question: 'What syntax lets you write HTML-like markup inside JavaScript?',
    answer: 'JSX',
  },
  {
    id: 4,
    question: 'What are the inputs a parent passes to a child component called?',
    answer: 'Props',
    accept: ['properties'],
  },
  {
    id: 5,
    question: 'Which prop gives list items a stable identity?',
    answer: 'key',
  },
  {
    id: 6,
    question: 'What wrapper groups elements without adding an extra DOM node?',
    answer: 'Fragment',
    accept: ['React.Fragment', '<></>'],
  },
  {
    id: 7,
    question: 'What is the in-memory copy of the page that React diffs against?',
    answer: 'Virtual DOM',
  },
  {
    id: 8,
    question: 'A form input whose value is driven by React state is called a ___ component.',
    answer: 'Controlled',
  },
  {
    id: 9,
    question: 'Moving shared state to the closest common parent is called ___.',
    answer: 'Lifting state up',
  },
  {
    id: 10,
    question: 'Which hook holds a mutable value that does not cause a re-render when changed?',
    answer: 'useRef',
  },
  {
    id: 11,
    question: 'Which hook caches the result of an expensive calculation between renders?',
    answer: 'useMemo',
  },
  {
    id: 12,
    question: 'Which tool built this project and runs its dev server?',
    answer: 'Vite',
  },
]

export default cards
