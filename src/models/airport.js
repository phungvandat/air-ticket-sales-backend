import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define airport schema
const airportSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  photo: { type: String },
  flag: { type: Number, default: 1 }, // -1 deactivate
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

airportSchema.plugin(uniqueValidator)
export default mongoose.model('Airport', airportSchema)