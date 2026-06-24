import { Router } from 'express'
import { Franchisee, Subscriber, Asset } from './models.js'

const router = Router()

// ─── Helper ──────────────────────────────────────────────────────────
function crud(path, Model) {
  // List
  router.get(path, async (req, res) => {
    try {
      const docs = await Model.find().sort({ createdAt: -1 })
      res.json(docs)
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  // Get one
  router.get(`${path}/:id`, async (req, res) => {
    try {
      const doc = await Model.findById(req.params.id)
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.json(doc)
    } catch (e) { res.status(500).json({ error: e.message }) }
  })

  // Create
  router.post(path, async (req, res) => {
    try {
      const doc = await Model.create(req.body)
      res.status(201).json(doc)
    } catch (e) { res.status(400).json({ error: e.message }) }
  })

  // Update
  router.put(`${path}/:id`, async (req, res) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.json(doc)
    } catch (e) { res.status(400).json({ error: e.message }) }
  })

  // Delete
  router.delete(`${path}/:id`, async (req, res) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id)
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.json({ deleted: true })
    } catch (e) { res.status(500).json({ error: e.message }) }
  })
}

crud('/franchisees', Franchisee)
crud('/subscribers', Subscriber)
crud('/assets', Asset)

export default router
