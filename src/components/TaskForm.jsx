import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/features/tasks/taskSlice.js';
import { nanoid } from 'nanoid';

export const TaskForm = () => {
    const [task, setTask] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === '') {
            return;
        }
        dispatch(addTask({
            id: nanoid(),
            text: task.trim(),
            completed: false,
        }))
        setTask('');
    }
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add new task"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Add Task</button>
        </form>
    )
}
