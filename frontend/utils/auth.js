import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import api from './api'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const token = Cookies.get('token')
    if(!token){ setLoading(false); return }
    api.get('/profile', { headers: { Authorization: `Bearer ${token}` }})
      .then(r => setUser(r.data))
      .catch(()=> Cookies.remove('token'))
      .finally(()=> setLoading(false))
  },[])

  const login = async ({ email, password }) =>{
    const r = await api.post('/auth/login', { email, password })
    Cookies.set('token', r.data.token)
    const profile = await api.get('/profile', { headers: { Authorization: `Bearer ${r.data.token}` }})
    setUser(profile.data)
  }

  const signup = async (payload) =>{
    const r = await api.post('/auth/signup', payload)
    Cookies.set('token', r.data.token)
    const profile = await api.get('/profile', { headers: { Authorization: `Bearer ${r.data.token}` }})
    setUser(profile.data)
  }

  const logout = () =>{
    Cookies.remove('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
