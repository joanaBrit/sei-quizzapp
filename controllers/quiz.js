
import mongoose from 'mongoose'
import Quiz from '../models/quiz.js'


// * Index route
// get / quizzes
export const getAllQuizzes = async (req, res) => {
  console.log('HIT GET ALL QUIZZES ROUTE')
  const quizzes = await Quiz.find()
  return res.json(quizzes)
}



// * Show route

export const getSingleQuiz = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.isValidObjectId(id)){
    return res.status(404).json('Not found')
  }

  try {

    const quizzes = await Quiz.findById(id)

    if (!quizzes){
      throw new Error('Quiz not present in database')
    }

    return res.json(quizzes
      // .questions.map(quiz => {
      // return quiz.question
      // })
    )
  } catch (error) {
    console.log('ERROR ->', error)
    return res.status(422).json(error)
  }

}

export const getSingleQuestion = async (req, res) => {
  const { quizId, questionId } = req.params
  
  if (!mongoose.isValidObjectId(quizId)){
    return res.status(404).json('Not valid Quiz Id')
  }
  if (!mongoose.isValidObjectId(questionId)){
    return res.status(404).json('Not Valid Question Id')
  }

  try {

    const singleQuiz = await Quiz.findById(quizId)

    const question = singleQuiz.questions.id(questionId)


    if (!question){
      throw new Error('Question not present in database')
    }

    return res.json(question)
  } catch (error) {
    console.log('ERROR ->', error)
    return res.status(422).json(error)
  }

}

export const updateSingleQuestion = async (req,res) => {
  const { quizId, questionId } = req.params
  
  if (!mongoose.isValidObjectId(quizId)){
    return res.status(404).json('Not valid Quiz Id')
  }
  if (!mongoose.isValidObjectId(questionId)){
    return res.status(404).json('Not Valid Question Id')
  }

  try {

    const singleQuiz = await Quiz.findById(quizId)

    const question = singleQuiz.questions.id(questionId)

    if (!question) return res.status(404).json('Question not found')

    Object.assign(question, req.body)
    await question.save()

    return res.json(singleQuiz)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }

}

// * POST Route 
export const addSingleQuestion = async (req,res) => {
  console.log('HIT ADD SINGLE QUESTION ROUTE')

  const { quizId } = req.params
  try {
    console.log(quizId)

    // find the quiz with the id from the request
    const foundQuiz = await Quiz.findById(quizId)
    if (!foundQuiz) throw new Error('Quiz not found')
    console.log(foundQuiz.questions)
    
    //add userId to question. The user Id is added to the request via the token in the secure route. 
    const newQuestion = { ...req.body, addedBy: req.user._id }

    // append a question to the questions array of that quiz
    foundQuiz.questions = [ ...foundQuiz.questions, newQuestion]

    // Status 201 means "created"
    return res.status(201).json( foundQuiz )
  } catch (error) {
    console.log(error.message)
    return res.json( { error: error.message })
  }
}
