import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define airport schema
const airportSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  photos: [{ type: String }],
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

airportSchema.plugin(uniqueValidator)
export default mongoose.model('Airport', airportSchema)