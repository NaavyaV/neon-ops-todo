export default function TodoItem({ todo, index, onToggle, onDelete }) {
  return (
    <li>
      <button onClick={() => onToggle(todo.id)}>{todo.completed ? 'done' : 'open'}</button>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>TERMINATE</button>
    </li>
  )
}
