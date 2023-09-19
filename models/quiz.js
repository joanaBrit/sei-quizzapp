import mongoose from 'mongoose'

// * SCHEMAS

// QUESTION
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true }, 
  answer: { type: String, required: true }, 
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
})


// QUIZ
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 30 }, 
  questions: [ questionSchema ], 
  icon: { type: String },

  // ! BONUS 
  // add max number of questions
  // add highscore 
  // add functionality for duplicate questions 
  // add functionality to create new quiz (only available to admins)

})


// * EXPORT MODEL
export default mongoose.model('Quiz', quizSchema)