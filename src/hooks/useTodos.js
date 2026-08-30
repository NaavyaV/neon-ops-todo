import { useState, useEffect } from 'react'
const STORAGE_KEY = 'neon-ops-todos'
export function useTodos() {
  const [todos, setTodos] = useState(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : [] } catch { return [] }
  })
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)) }, [todos])
  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return false
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text: trimmed, completed: false, createdAt: Date.now() }])
    return true
  }
  const toggleTodo = (id) => setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  const deleteTodo = (id) => setTodos(prev => prev.filter(t => t.id !== id))
  const clearCompleted = () => setTodos(prev => prev.filter(t => !t.completed))
  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted }
}
