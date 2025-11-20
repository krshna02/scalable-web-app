require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const tasksRoutes = require('./routes/tasks')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/tasks', tasksRoutes)

const PORT = process.env.PORT || 5000

connectDB().then(()=>{
  app.listen(PORT, ()=> console.log('Server started on', PORT))
}).catch(e=>{
  console.error(e)
})
