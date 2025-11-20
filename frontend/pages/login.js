import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../utils/auth'

export default function Login(){
  const { login } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      await login(form)
      router.push('/dashboard')
    } catch(e){ setErr(e.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={submit} className="p-6 bg-white rounded shadow w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <input className="w-full p-2 border mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input type="password" className="w-full p-2 border mb-4" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  )
}
