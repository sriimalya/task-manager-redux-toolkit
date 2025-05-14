import { TaskForm } from './components/TaskForm.jsx'
import { TaskList } from './components/TaskList.jsx'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 My Task List</h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>

  )
}

export default App
