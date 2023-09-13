import mongoose from 'mongoose'


// * SCHEMA 

const userSchema = new mongoose.schema({
  username: { type: String, required: true, unique: true, maxlength: 30 }, 
  email: { type: String, requried: true, unique: true}, 
  password: { type: String, required: true}
})

// * VIRTUAL FIELDS 
// password confirmation 

// * PRE VALIDATION & SAVE

// * EXPORT MODEL 
export default mongoose.model('User', userSchema)