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

      <span className="todo-text">{todo.text}</span>

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
