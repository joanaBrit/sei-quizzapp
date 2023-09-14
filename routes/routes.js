import express from 'express'
import { getSingleQuiz,updateSingleQuestion } from '../controllers/quiz.js'

const router = express.Router()

router.route('/quizzes/:id')
  .get(getSingleQuiz)
  .put(/*secureRoute, */updateSingleQuestion)

export default router