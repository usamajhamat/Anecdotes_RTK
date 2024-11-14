const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const ADD_ANECDOTE = 'ADD_ANECDOTE'
const VOTE_ANECDOTE_PLUS = 'VOTE_ANECDOTE+'
const VOTE_ANECDOTE_MINUS = 'VOTE_ANECDOTE-'

export const addAnecdote = (content) => {
  return {
    type: ADD_ANECDOTE,
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}
const sortAnecdotesByVotes = (anecdotes) =>{
  return anecdotes.sort((a,b)=> b.votes - a.votes)
}

export const voteAnecdotePlus = (id) => {
  return {
    type: VOTE_ANECDOTE_PLUS,
    data: { id }
  }
}

export const voteAnecdoteMinus = (id) => {
  return {
    type: VOTE_ANECDOTE_MINUS,
    data: { id }
  }
}



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANECDOTE:
      return [...state, action.data]

    case VOTE_ANECDOTE_PLUS:
      const updatePlusState = state.map(anecdote =>
        anecdote.id !== action.data.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      )
    return sortAnecdotesByVotes(updatePlusState)

    case VOTE_ANECDOTE_MINUS:
      const updateMinusState = state.map(anecdote =>
        anecdote.id !== action.data.id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes - 1 }
      )
      return sortAnecdotesByVotes(updateMinusState)

    default:
      return state
  }
}

export default reducer
