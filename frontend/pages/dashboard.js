import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../utils/auth'
import api from '../utils/api'
import Cookies from 'js-cookie'

export default function Dashboard(){
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const [tasks, setTasks] = useState([])
  const [q, setQ] = useState('')
  const [newTask, setNewTask] = useState({ title: '', description: '' })

  useEffect(()=>{
    if(!loading && !user) router.push('/login')
  },[user, loading])

  useEffect(()=>{
    if(user) fetchTasks()
  },[user])

  // ✅ Create Task
  async function createTask(){
    const token = Cookies.get('token')

    if(!newTask.title) {
      alert("Title is required")
      return
    }

    try {
      await api.post('/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setNewTask({ title: '', description: '' })
      fetchTasks()
    } catch(err){
      console.error("Create task error:", err)
      alert("Error creating task")
    }
  }

  async function fetchTasks(){
    const token = Cookies.get('token')

    const res = await api.get(`/tasks?q=${encodeURIComponent(q)}`, {
      headers:{ Authorization:`Bearer ${token}` }
    })

    setTasks(res.data)
  }

  async function toggleComplete(t){
    const token = Cookies.get('token')

    await api.put(
      `/tasks/${t._id}`,
      { completed: !t.completed },
      { headers:{ Authorization:`Bearer ${token}` }}
    )

    fetchTasks()
  }

  async function removeTask(id){
    const token = Cookies.get('token')

    await api.delete(`/tasks/${id}`, {
      headers:{ Authorization:`Bearer ${token}` }
    })

    fetchTasks()
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Dashboard</h1>
        <div>
          <span className="mr-4">{user?.name}</span>
          <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">
            Logout
          </button>
        </div>
      </div>

      {/* ✅ Create Task Section */}
      <div className="mb-6 space-y-3">

        <div className="flex gap-2">
          <input
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task title"
            className="p-2 border w-1/3"
          />

          <input
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Task description"
            className="p-2 border w-1/3"
          />

          <button
            onClick={createTask}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Add Task
          </button>
        </div>

        {/* Search */}
        <div>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search tasks"
            className="p-2 border mr-2"
          />

          <button
            onClick={fetchTasks}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-3">
        {tasks.map(t => (
          <div key={t._id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <h3 className={`font-semibold ${t.completed ? 'line-through' : ''}`}>
                {t.title}
              </h3>
              <p className="text-sm text-gray-600">
                {t.description}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleComplete(t)}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                Toggle
              </button>

              <button
                onClick={() => removeTask(t._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
