const express = require('express')
const Task = require('../models/Task')
const auth = require('../middlewares/auth')

const router = express.Router()

// Create
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body
  if(!title) return res.status(400).json({ message: 'Title required' })
  const task = new Task({ title, description, owner: req.user._id })
  await task.save()
  res.json(task)
})

// Read (with simple search q)
router.get('/', auth, async (req, res) => {
  const { q } = req.query
  const filter = { owner: req.user._id }
  if(q) filter.$or = [ { title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') } ]
  const tasks = await Task.find(filter).sort({ createdAt: -1 })
  res.json(tasks)
})

// Update
router.put('/:id', auth, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
  if(!task) return res.status(404).json({ message: 'Not found' })
  Object.assign(task, req.body)
  await task.save()
  res.json(task)
})

// Delete
router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
  if(!task) return res.status(404).json({ message: 'Not found' })
  res.json({ message: 'Deleted' })
})

module.exports = router
