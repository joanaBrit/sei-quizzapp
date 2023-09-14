
import mongoose from 'mongoose'
import Quiz from '../models/quiz.js'

export const getSingleQuiz = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.isValidObjectId(id)){
    return res.status(404).json('Not found')
  }

  try {

    const quizzes = await Quiz.findById(id)

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