import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define air ticket schema
const airTicketSchema = new Schema({
  flight: { type: Schema.Types.ObjectId, required: true, ref: 'Flight' },
  seatNumber: { type: Number },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  ticketRank: { type: String },
  price: { type: Number , default: 0},
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

airTicketSchema.plugin(uniqueValidator)
export default mongoose.model('AirTicket', airTicketSchema)