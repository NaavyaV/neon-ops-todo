import { useState } from 'react'
export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onAdd(value)) setValue('')
  }
  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <label htmlFor="task-input" className="input-label">&gt; INITIALIZE OPERATION</label>
      <div className="input-row">
        <span className="input-prompt" aria-hidden="true">//</span>
        <input id="task-input" type="text" className="input-field" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter directive..." autoComplete="off" spellCheck={false} maxLength={120} />
        <button type="submit" className="input-submit" disabled={!value.trim()}>EXEC</button>
      </div>
    </form>
  )
}
