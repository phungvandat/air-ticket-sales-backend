import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import uniqueValidator from 'mongoose-unique-validator'

// Define user schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

// Hash password before save
userSchema.pre('save', function (next) {
  const user = this 
  if (user.isNew || user.isModified('password')) {

    bcrypt.genSalt((err, salt) => {
      if (err) return next(err)

      bcrypt.hash(user.password, salt, (err, hashedPassword) => {
        if (err) return next(err)

        user.password = hashedPassword
        next()
      })
    })
  } else {
    next()
  }
})

// Compare password
userSchema.methods.comparePassword = function (password) {
  return new Promise((resolve, reject) => (
    bcrypt.compare(password, this.password, (err, isMatched) => {
      if (err) return reject(err)
      resolve(isMatched)
    })
  ))
}

userSchema.plugin(uniqueValidator)
export default mongoose.model('User', userSchema)

