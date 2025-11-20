const express = require('express')
const auth = require('../middlewares/auth')
const router = express.Router()

router.get('/', auth, async (req, res) => {
  res.json(req.user)
})

router.put('/', auth, async (req, res) => {
  const { name } = req.body
  if(!name) return res.status(400).json({ message: 'Name required' })
  try{
    const user = req.user
    user.name = name
    await user.save()
    res.json(user)
  } catch(e){ res.status(500).json({ message: 'Server error' }) }
})

module.exports = router
