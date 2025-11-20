const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { validateSignup, validateLogin } = require('../utils/validators')

const router = express.Router()

router.post('/signup', async (req, res)=>{
  const { error } = validateSignup(req.body)
  if(error) return res.status(400).json({ message: error.details[0].message })

  const { name, email, password } = req.body
  try{
    const existing = await User.findOne({ email })
    if(existing) return res.status(400).json({ message: 'Email already registered' })

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({ name, email, passwordHash })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'verysecret', { expiresIn: '7d' })

    res.json({ token })
  } catch(e){
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res)=>{
  const { error } = validateLogin(req.body)
  if(error) return res.status(400).json({ message: error.details[0].message })

  const { email, password } = req.body
  try{
    const user = await User.findOne({ email })
    if(!user) return res.status(400).json({ message: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'verysecret', { expiresIn: '7d' })

    res.json({ token })
  } catch(e){ res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
