import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define flight schema
const flightSchema = new Schema({
  fromAirport: { type: Schema.Types.ObjectId, required: true, ref: 'Airport' },
  toAirport: { type: Schema.Types.ObjectId, required: true, ref: 'Airport' },
  flightTime: { type: Date, required: true },
  times: { type: Number },
  numSeats: { type: Number },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

flightSchema.plugin(uniqueValidator)
export default mongoose.model('Flight', flightSchema)