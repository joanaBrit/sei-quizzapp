import express from 'express'
import { secureRoute } from './secureRoutes.js'
import { getAllQuizzes, getSingleQuestion, getSingleQuiz, updateSingleQuestion, addSingleQuestion, deleteSingleQuestion } from '../controllers/quiz.js'

import { registerUser, loginUser } from '../controllers/users.js'

const router = express.Router()

// ! Quizzes
// Index route
router.route('/quizzes')
  .get(getAllQuizzes)

router.route('/quizzes/:id')
  .get(getSingleQuiz)

router.route('/quizzes/:quizId/questions')
  .post(secureRoute, addSingleQuestion)

router.route('/quizzes/:quizId/questions/:questionId')
  .get(getSingleQuestion)
  .put(secureRoute, updateSingleQuestion)
  .delete(secureRoute, deleteSingleQuestion)

// ! Users
// Register
router.route('/register')
  .post(registerUser)

// Login
router.route('/login')
  .post(loginUser)


export default router