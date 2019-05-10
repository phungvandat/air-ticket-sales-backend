import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// Define customer schema
const customerSchema = new Schema({
  fullname: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  identityCard: { type: String },
  birthday: { type: Date, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

customerSchema.plugin(uniqueValidator)
export default mongoose.model('Customer', customerSchema)