import { useState, useEffect, useRef } from 'react'
import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import CalendarView from './components/CalendarView'
import StatusBar from './components/StatusBar'
import './App.css'
import './shapes.css'

const FILTERS = [
  { id: 'all', label: 'ALL OPS' },
  { id: 'active', label: 'ACTIVE' },
  { id: 'completed', label: 'ARCHIVED' },
]

const VIEWS = [
  { id: 'list', label: 'OPS LIST' },
  { id: 'calendar', label: 'CALENDAR' },
]

function filterTodos(todos, filter) {
  if (filter === 'active') return todos.filter((t) => !t.completed)
  if (filter === 'completed') return todos.filter((t) => t.completed)
  return todos
}

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('all')
  const [time, setTime] = useState(new Date())
  const fieldRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return undefined

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const apply = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      const field = fieldRef.current
      const grid = gridRef.current
      if (field) {
        field.style.setProperty('--px', currentX.toFixed(4))
        field.style.setProperty('--py', currentY.toFixed(4))
      }
      if (grid) {
        grid.style.setProperty('--px', (currentX * 0.35).toFixed(4))
        grid.style.setProperty('--py', (currentY * 0.35).toFixed(4))
      }
      if (Math.abs(targetX - currentX) > 0.0005 || Math.abs(targetY - currentY) > 0.0005) {
        raf = requestAnimationFrame(apply)
      } else {
        raf = 0
      }
    }

    const onMove = (event) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      targetX = (event.clientX / w) * 2 - 1
      targetY = (event.clientY / h) * 2 - 1
      if (!raf) raf = requestAnimationFrame(apply)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const visible = filterTodos(todos, filter)
  const activeCount = todos.filter((t) => !t.completed).length
  const completedCount = todos.filter((t) => t.completed).length
  const scheduledCount = todos.filter((t) => t.dueDate).length

  return (
    <div className={`app ${view === 'calendar' ? 'app--calendar' : ''}`}>
      <div className="neon-field" aria-hidden="true" ref={fieldRef}>
        <span className="shape shape-glow shape-glow--cyan" />
        <span className="shape shape-glow shape-glow--magenta" />
        <span className="shape shape-ring" />
        <span className="shape shape-diamond" />
        <span className="shape shape-hex" />
        <span className="shape shape-blade" />
        <span className="shape shape-chevron" />
        <span className="shape shape-bar" />
        <span className="shape shape-cross" />
        <span className="shape shape-arc" />
        <span className="shape shape-pill" />
      </div>
      <div className="scanlines" aria-hidden="true" />
      <div className="grid-bg" aria-hidden="true" ref={gridRef} />

      <main className={`terminal ${view === 'calendar' ? 'terminal--calendar' : ''}`}>
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

        <StatusBar
          active={activeCount}
          completed={completedCount}
          total={todos.length}
          scheduled={scheduledCount}
        />

        <nav className="view-bar" aria-label="View mode">
          {VIEWS.map(({ id, label }) => (
            <button
              key={id}
              className={`view-btn ${view === id ? 'view-btn--active' : ''}`}
              onClick={() => setView(id)}
              aria-pressed={view === id}
            >
              {label}
            </button>
          ))}
        </nav>

        {view === 'list' ? (
          <>
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

            <TodoList
              todos={visible}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              filter={filter}
            />

            {completedCount > 0 && (
              <footer className="terminal-footer">
                <button className="purge-btn" onClick={clearCompleted}>
                  PURGE ARCHIVED [{completedCount}]
                </button>
              </footer>
            )}
          </>
        ) : (
          <CalendarView todos={todos} onToggle={toggleTodo} />
        )}
      </main>
    </div>
  )
}
