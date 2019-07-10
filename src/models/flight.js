import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define flight schema
const flightSchema = new Schema({
  fromAirport: { type: Schema.Types.ObjectId, required: true, ref: 'Airport' },
  toAirport: { type: Schema.Types.ObjectId, required: true, ref: 'Airport' },
  flightTime: { type: Date, required: true },
  times: { type: Number, min: 30 },
  numSeatsLuxurious: { type: Number },
  numSeatsOrdinary: { type: Number },
  price: { type: Number },
  intermediateAirport: {
    type: [{
      intermAirportId: { type: Schema.Types.ObjectId, ref: 'Airport' },
      timeStop: { type: Number, min: 10, max: 20 },
      note: { type: String },
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'],
  },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

function arrayLimit(val) {
  return val.length <= 2
}

flightSchema.plugin(uniqueValidator)
export default mongoose.model('Flight', flightSchema)