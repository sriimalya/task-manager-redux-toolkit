import { createSlice } from '@reduxjs/toolkit'

const loadTaskFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('tasks')
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error('Error loading tasks from localStorage', error)
        return []
    }
}

const saveTaskToLocalStorage = (tasks) => {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    } catch (error) {
        console.error('Error saving tasks to localStorage', error)
    }
}

const initialState = {
    tasks: loadTaskFromLocalStorage(),
    filter: {
        status: 'all',
        search: '',
    }
}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
            saveTaskToLocalStorage(state.tasks)
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
            saveTaskToLocalStorage(state.tasks)
        },
        editTask: (state, action) => {
            const { id, updatedTask } = action.payload
            const task = state.tasks.find(t => t.id === id)
            if (task) task.text = updatedTask
            saveTaskToLocalStorage(state.tasks)
        },
        toggleComplete: (state, action) => {
            const task = state.tasks.find(t => t.id === action.payload)
            if (task) task.completed = !task.completed
            saveTaskToLocalStorage(state.tasks)
        },
        setStatusFilter: (state, action) => {
            state.filter.status = action.payload;
        },
        setSearchFilter: (state, action) => {
            state.filter.search = action.payload;
        }
    }
})

export const { addTask, deleteTask, editTask, toggleComplete, setStatusFilter, setSearchFilter } = taskSlice.actions

export default taskSlice.reducer