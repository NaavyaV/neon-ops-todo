import { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onAdd(value, dueDate || null)) {
      setValue('')
      setDueDate('')
    }
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <label htmlFor="task-input" className="input-label">
        &gt; INITIALIZE OPERATION
      </label>
      <div className="input-row">
        <span className="input-prompt" aria-hidden="true">
          //
        </span>
        <input
          id="task-input"
          type="text"
          className="input-field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter directive..."
          autoComplete="off"
          spellCheck={false}
          maxLength={120}
        />
        <button type="submit" className="input-submit" disabled={!value.trim()}>
          EXEC
        </button>
      </div>
      <div className="input-date-row">
        <label htmlFor="task-date" className="input-date-label">
          TIMESTAMP (OPTIONAL)
        </label>
        <input
          id="task-date"
          type="date"
          className="input-date-field"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
    </form>
  )
}
