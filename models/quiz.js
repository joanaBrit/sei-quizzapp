import mongoose from 'mongoose'

// * SCHEMAS

//QUESTION ELEMENT
// ! OPTIONAL: REFACTOR AT A LATER POINT
// const questionElementSchema = new mongoose.Schema({
//   text: { type: String, required: true }, 
//   image: { type: String, required: false }, 
// })

// QUESTION
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true }, 
  answer: { type: String, required: false }, 
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, 
  questionImage: { type: String, required: false }, 
  answerImage: { type: String, required: false },
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