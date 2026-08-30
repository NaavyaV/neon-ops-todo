import TodoItem from './TodoItem'
export default function TodoList({ todos, onToggle, onDelete }) {
  if (!todos.length) return <p>NO OPERATIONS QUEUED</p>
  return <ul>{todos.map((todo, index) => <TodoItem key={todo.id} todo={todo} index={index} onToggle={onToggle} onDelete={onDelete} />)}</ul>
}
