import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes.js'
import { seedIfEmpty } from './seed.js'

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/truenorth'

const app = express()
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }))

// Debug: log all requests
app.use((req, res, next) => { console.log(`  ${req.method} ${req.url}`); next() })

app.use('/api', router)

async function start() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log(`✓ MongoDB connected: ${MONGO_URI}`)
    await seedIfEmpty()
    app.listen(PORT, () => console.log(`✓ API server on http://localhost:${PORT}`))
  } catch (err) {
    console.error('Failed to start:', err)
    process.exit(1)
  }
}

start()
