import express from 'express'
import { getSingleQuiz } from '../controllers/quiz.js'

const router = express.Router()

router.route('/quizzes/:id')
  .get(getSingleQuiz)
  // .put(secureRoute, updateQuiz)

export default router