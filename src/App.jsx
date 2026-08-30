import { useTodos } from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import StatusBar from './components/StatusBar'
import './App.css'
export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodos()
  const active = todos.filter(t => !t.completed).length
  const completed = todos.filter(t => t.completed).length
  return (
    <div className="app">
      <h1>NEON/OPS</h1>
      <StatusBar active={active} completed={completed} total={todos.length} />
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} filter="all" />
      {completed > 0 && <button onClick={clearCompleted}>PURGE ARCHIVED</button>}
    </div>
  )
}
