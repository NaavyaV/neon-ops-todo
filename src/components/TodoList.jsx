import TodoItem from './TodoItem'
const EMPTY_MESSAGES = {
  all: { title: 'NO OPERATIONS QUEUED', hint: 'Initialize your first directive above.' },
  active: { title: 'ALL OPS COMPLETE', hint: 'No active directives in the queue.' },
  completed: { title: 'ARCHIVE EMPTY', hint: 'Completed operations appear here.' },
}
export default function TodoList({ todos, onToggle, onDelete, filter }) {
  if (todos.length === 0) {
    const msg = EMPTY_MESSAGES[filter]
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">░░░</div>
        <p className="empty-title">{msg.title}</p>
        <p className="empty-hint">{msg.hint}</p>
      </div>
    )
  }
  return (
    <ul className="todo-list" aria-label="Task list">
      {todos.map((todo, index) => (
        <TodoItem key={todo.id} todo={todo} index={index} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
