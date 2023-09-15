
import mongoose from 'mongoose'
import Quiz from '../models/quiz.js'


// * Index route
// get / quizzes
export const getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find()
  return res.json(quizzes)
}



// * Show route

export const getSingleQuiz = async (req, res) => {
  const { quizId } = req.params
  
  if (!mongoose.isValidObjectId(quizId)){
    return res.status(404).json('Not found')
  }

  try {

    const quizzes = await Quiz.findById(quizId)

    if(!quizzes){
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


    if(!question){
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

    if(!question) return res.status(404).json('Question not found')

    Object.assign(question, req.body)
    await question.save()

    return res.json(singleQuiz)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }

}
