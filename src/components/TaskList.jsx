import { useDispatch, useSelector } from "react-redux"
import { deleteTask, editTask, toggleComplete, setSearchFilter, setStatusFilter } from "../redux/features/tasks/taskSlice"
import { useState } from "react"

export const TaskList = () => {
    const { tasks, filter } = useSelector((state) => state.tasks)
    const dispatch = useDispatch()

    const [editId, setEditId] = useState(null)
    const [editText, setEditText] = useState('')

    const handleEdit = (id, text) => {
        setEditId(id)
        setEditText(text)
    }

    const handleEditSave = (id) => {
        if (editText.trim()) {
            dispatch(editTask({ id, updatedTask: editText.trim() }))
            setEditId(null)
            setEditText('')
        }
    }

    const filteredTasks = tasks.filter(task => {
        if (filter.status === 'completed') {
            return task.completed
        } else if (filter.status === 'pending') {
            return !task.completed
        }
        return true
    }).filter(task => {
        return task.text.toLowerCase().includes(filter.search.toLowerCase())
    })

    return (
        <div flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4>
            {/* Search Task */}
            <input type="text"
                placeholder="Search tasks..."
                value={filter.search}
                onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {/* Filter Tasks */}
            <div className="flex gap-2 mb-4">
                {
                    ['all', 'completed', 'pending'].map(status => (
                        <button
                            onClick={() => dispatch(setStatusFilter(status))}
                            className={`text-sm px-3 py-1 rounded border ${filter.status === status ?
                                'bg-blue-600 text-white' :
                                'bg-white'}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))
                }
            </div>
           

            {/* Display Tasks List */}
            <ul className="space-y-2">
                {filteredTasks.length === 0 && <p>No tasks available</p>}
                {
                    filteredTasks.map(task => (
                        <li
                            key={task.id}
                            className={"flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200"}>
                            <div className="flex items-center gap-3">
                                <input type="checkbox"
                                    checked={task.completed}
                                    onChange={(e) => dispatch(toggleComplete(task.id))}
                                    className="w-4 h-4 accent-blue-600"
                                />
                                {
                                    editId === task.id ? (
                                        <input type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="border rounded px-2" />
                                    ) : (<span
                                        className={`${task.completed ? "line-through text-gray-400" : ""}`}>
                                        {task.text}
                                    </span>)
                                }
                            </div>

                            <div className="flex gap-2">
                                {
                                    editId === task.id ?
                                        (<button onClick={() => handleEditSave(task.id)} className="text-green-600 hover:underline cursor-pointer">Save</button>) :
                                        (<button onClick={() => { handleEdit(task.id, task.text) }} className="text-blue-600 hover:underline cursor-pointer">Edit</button>)
                                }
                                <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-500 hover:text-red-700 transition">Delete</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}