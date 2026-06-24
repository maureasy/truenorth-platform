import mongoose from 'mongoose'

const franchiseeSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  owner:          { type: String, required: true },
  brandId:        { type: String, required: true },
  status:         { type: String, enum: ['healthy', 'watch', 'at_risk'], default: 'healthy' },
  units:          { type: Number, default: 1 },
  workers:        { type: Number, default: 0 },
  monthlyRevenue: { type: Number, default: 0 },
  churn:          { type: Number, default: 0 },
  nps:            { type: Number, default: 70 },
  observationRate:{ type: Number, default: 0 },
  conversionRate: { type: Number, default: 0 },
  since:          { type: String, default: '' },
}, { timestamps: true })

const subscriberSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, default: '' },
  address:       { type: String, default: '' },
  tier:          { type: String, enum: ['none', 'basic', 'pro', 'total_home'], default: 'none' },
  status:        { type: String, enum: ['prospect', 'active', 'paused', 'cancelled'], default: 'prospect' },
  memberSince:   { type: Date, default: Date.now },
  totalSpend:    { type: Number, default: 0 },
  servicesUsed:  [{ type: String }],
  franchiseeId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Franchisee', default: null },
  notes:         { type: String, default: '' },
}, { timestamps: true })

const assetSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  type:          { type: String, enum: ['vehicle', 'equipment', 'tool', 'other'], required: true },
  brandId:       { type: String, required: true },
  status:        { type: String, enum: ['in_use', 'available', 'maintenance', 'retired'], default: 'available' },
  assignedTo:    { type: String, default: '' },
  serialNumber:  { type: String, default: '' },
  purchaseDate:  { type: String, default: '' },
  lastService:   { type: String, default: '' },
  value:         { type: Number, default: 0 },
  notes:         { type: String, default: '' },
}, { timestamps: true })

export const Franchisee = mongoose.model('Franchisee', franchiseeSchema)
export const Subscriber = mongoose.model('Subscriber', subscriberSchema)
export const Asset = mongoose.model('Asset', assetSchema)
