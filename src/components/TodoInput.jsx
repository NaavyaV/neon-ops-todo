import { useState } from 'react'
export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (onAdd(value)) setValue('') }}>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter directive..." />
      <button type="submit" disabled={!value.trim()}>EXEC</button>
    </form>
  )
}
