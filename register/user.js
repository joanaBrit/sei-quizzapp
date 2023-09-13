import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


// *Schema 
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 15 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, milength: 5 }
})


// ? Virtual Field
userSchema
.virtual('passwordConfirmation')
.set(function(fieldValue) {
  this._passwordConfirmation = fieldValue
})


// * Transform the data when sent back to the client
userSchema
.set('toJSON', {
  transform: function(doc, json){
    // update the object and remove the pass
    delete json.password
  }
})

// * Pre Validation
userSchema
.pre('validate', function(next){
  // userSchema password matches the userSchema passwordConfirmation
  if(this.isModified('password') && this.password !== this._passwordConfirmation){
    // If passwords don't match
    this.invalidate('passwordConfirmation', 'Passwords are not the same.')
  }
  next()
})


// * Pre Save
userSchema
.pre('save', function(next){
  // check if the password is being created or modified, Hash the password
if (this.isModified('password')){
  this.password = bcrypt.hashSync(this.password, 10)
}
next()
})


userSchema.methods.validatePassword = function(plainTextPass){
  // Comparing the hash with the plainPassword 
return bcrypt.compareSync(plainTextPass, this.password)
}


// ? Model
export default mongoose.model('User', userSchema)
