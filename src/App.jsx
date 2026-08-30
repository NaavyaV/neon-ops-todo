import { useState, useEffect } from 'react'
import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import StatusBar from './components/StatusBar'
import './App.css'

const FILTERS = [
  { id: 'all', label: 'ALL OPS' },
  { id: 'active', label: 'ACTIVE' },
  { id: 'completed', label: 'ARCHIVED' },
]

function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed)
  if (filter === 'completed') return todos.filter((t) => t.completed)
  return todos
}

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState('all')
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const visible = filterTodos(todos, filter)
  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="app">
      <div className="scanlines" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" />
      <main className="terminal">
        <header className="terminal-header">
          <div className="header-brand">
            <span className="brand-glyph">◈</span>
            <div>
              <h1 className="brand-title">NEON/OPS</h1>
              <p className="brand-sub">Neural Task Terminal v2.077</p>
            </div>
          </div>
          <div className="header-meta">
            <span className="meta-chip">SECTOR 7G</span>
            <span className="meta-time">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </span>
          </div>
        </header>
        <StatusBar active={activeCount} completed={completedCount} total={todos.length} />
        <TodoInput onAdd={addTodo} />
        <nav className="filter-bar" aria-label="Filter tasks">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              className={`filter-btn ${filter === id ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
            >
              {label}
            </button>
          ))}
        </nav>
        <TodoList todos={visible} onToggle={toggleTodo} onDelete={deleteTodo} filter={filter} />
        {completedCount > 0 && (
          <footer className="terminal-footer">
            <button className="purge-btn" onClick={clearCompleted}>
              PURGE ARCHIVED [{completedCount}]
            </button>
          </footer>
        )}
      </main>
    </div>
  )
}
