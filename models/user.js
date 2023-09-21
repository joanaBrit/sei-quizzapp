import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'


// * SCHEMA 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 15 },
  email: { type: String, requried: true, unique: true },
  password: { type: String, required: true, minlength: 4 }
})


// * Transform the data when sent back to the client
userSchema
  .set('toJSON', {
    virtuals: true,
    transform: function (doc, json) {
      // update the object and remove the pass
      delete json.password
    }
  })


// * VIRTUAL FIELDS 

// password confirmation 
userSchema
  .virtual('passwordConfirmation')
  .set(function (fieldValue) {
    this._passwordConfirmation = fieldValue
  })


// * PRE VALIDATION & SAVE

// * Pre Validation
userSchema
  .pre('validate', function (next) {
    // userSchema password matches the userSchema passwordConfirmation
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      // If passwords don't match
      this.invalidate('passwordConfirmation', 'Passwords are not the same.')
    }
    next()
  })


// * Pre Save
userSchema
  .pre('save', function (next) {
    // check if the password is being created or modified, Hash the password
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, 10)
    }
    next()
  })


// Add a custom method to the Schema
userSchema.methods.validatePassword = function (plainTextPassword) {
  // Comparing the hash with the plainPassword 
  return bcrypt.compareSync(plainTextPassword, this.password)
}


// * EXPORT MODEL 
export default mongoose.model('User', userSchema)