function formatDueDate(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export default function TodoItem({ todo, index, onToggle, onDelete }) {
  const opId = String(index + 1).padStart(3, '0')

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}>
      <span className="todo-id" aria-hidden="true">
        OP-{opId}
      </span>

      <button
        className="todo-check"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        aria-pressed={todo.completed}
      >
        <span className="check-inner">{todo.completed ? '✓' : ''}</span>
      </button>

      <div className="todo-body">
        <span className="todo-text">{todo.text}</span>
        {todo.dueDate && (
          <span className="todo-date" title={`Due ${todo.dueDate}`}>
            {formatDueDate(todo.dueDate)}
          </span>
        )}
      </div>

      <button
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        TERMINATE
      </button>
    </li>
  )
}
