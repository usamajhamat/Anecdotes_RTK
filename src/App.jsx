import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, voteAnecdotePlus, voteAnecdoteMinus } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state) 
  const dispatch = useDispatch()

  const [newAnecdote, setNewAnecdote] = useState('')

  const handleVotePlus = (id) => {
    dispatch(voteAnecdotePlus(id))
  }
  const handleVoteMinus = (id) =>{
    dispatch(voteAnecdoteMinus(id))
  }

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    if (newAnecdote.trim()) {  
      dispatch(addAnecdote(newAnecdote)) 
      setNewAnecdote('')  
    }
  }

  return (
    <div>
      <h1>Anecdotes</h1>
     
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id}>
            {anecdote.content} 
            <span> ({anecdote.votes} votes) </span>
            <button onClick={() => handleVotePlus(anecdote.id)}>Vote+</button>
            <button onClick={() => handleVoteMinus(anecdote.id)}>Vote-</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input
            type="text"
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)} 
            placeholder="Enter a new anecdote"
          />
        </div>
        <button type="submit">Add Anecdote</button>
      </form>
    </div>
  )
}

export default App
