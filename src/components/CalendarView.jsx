import { useMemo, useState } from 'react'

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function toDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseDateKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatMonthYear(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()
}

function formatDisplayDate(key) {
  return parseDateKey(key).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function CalendarView({ todos, onToggle }) {
  const today = useMemo(() => new Date(), [])
  const todayKey = toDateKey(today)
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedKey, setSelectedKey] = useState(todayKey)

  const todosByDate = useMemo(() => {
    const map = {}
    for (const todo of todos) {
      if (!todo.dueDate) continue
      if (!map[todo.dueDate]) map[todo.dueDate] = []
      map[todo.dueDate].push(todo)
    }
    return map
  }, [todos])

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startOffset = firstDay.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const cells = []
    for (let i = 0; i < startOffset; i++) cells.push(null)
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(new Date(year, month, day))
    }
    return cells
  }, [viewDate])

  const selectedTodos = todosByDate[selectedKey] ?? []

  const shiftMonth = (delta) => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1))
  }

  const goToToday = () => {
    const now = new Date()
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1))
    setSelectedKey(toDateKey(now))
  }

  return (
    <section className="calendar-view" aria-label="Calendar view">
      <div className="calendar-toolbar">
        <button type="button" className="cal-nav-btn" onClick={() => shiftMonth(-1)} aria-label="Previous month">
          ◀
        </button>
        <h2 className="calendar-title">{formatMonthYear(viewDate)}</h2>
        <button type="button" className="cal-nav-btn" onClick={() => shiftMonth(1)} aria-label="Next month">
          ▶
        </button>
      </div>

      <button type="button" className="cal-today-btn" onClick={goToToday}>
        JUMP TO TODAY
      </button>

      <div className="calendar-grid" role="grid" aria-label="Month calendar">
        {WEEKDAYS.map((day) => (
          <div key={day} className="calendar-weekday" role="columnheader">
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="calendar-cell calendar-cell--empty" />
          }

          const key = toDateKey(date)
          const dayTodos = todosByDate[key] ?? []
          const isToday = key === todayKey
          const isSelected = key === selectedKey
          const activeCount = dayTodos.filter((t) => !t.completed).length

          return (
            <button
              key={key}
              type="button"
              role="gridcell"
              className={[
                'calendar-cell',
                isToday ? 'calendar-cell--today' : '',
                isSelected ? 'calendar-cell--selected' : '',
                dayTodos.length > 0 ? 'calendar-cell--has-ops' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setSelectedKey(key)}
              aria-label={`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}${dayTodos.length ? `, ${dayTodos.length} tasks` : ''}`}
              aria-pressed={isSelected}
            >
              <span className="calendar-day-num">{date.getDate()}</span>
              {dayTodos.length > 0 && (
                <span className="calendar-dot-row" aria-hidden="true">
                  {dayTodos.slice(0, 3).map((todo) => (
                    <span
                      key={todo.id}
                      className={`calendar-dot ${todo.completed ? 'calendar-dot--done' : ''}`}
                    />
                  ))}
                </span>
              )}
              {activeCount > 0 && (
                <span className="calendar-count">{activeCount}</span>
              )}
            </button>
          )
        })}
      </div>

      <div className="calendar-day-panel">
        <h3 className="calendar-day-title">{formatDisplayDate(selectedKey)}</h3>
        {selectedTodos.length === 0 ? (
          <p className="calendar-day-empty">No timestamped operations for this date.</p>
        ) : (
          <ul className="calendar-day-list">
            {selectedTodos.map((todo) => (
              <li key={todo.id} className={`calendar-day-item ${todo.completed ? 'calendar-day-item--done' : ''}`}>
                <button
                  type="button"
                  className="calendar-day-check"
                  onClick={() => onToggle(todo.id)}
                  aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
                  aria-pressed={todo.completed}
                >
                  {todo.completed ? '✓' : ''}
                </button>
                <span className="calendar-day-text">{todo.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
