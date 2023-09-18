import express from 'express'
import { getAllQuizzes, getSingleQuestion, getSingleQuiz, updateSingleQuestion, addSingleQuestion } from '../controllers/quiz.js'

import { registerUser, loginUser, getUserProfile } from '../controllers/users.js'

const router = express.Router()

// ! Quizzes
// Index route
router.route('/quizzes')
  .get(getAllQuizzes)

router.route('/quizzes/:id')
  .get(getSingleQuiz)

router.route('/quizzes/:quizId/questions')
  .post(addSingleQuestion)

router.route('/quizzes/:quizId/:questionId')
  .get(getSingleQuestion)
  .put(/*secureRoute, */updateSingleQuestion)

// ! Users
// Register
router.route('/register')
  .post(registerUser)

// Login
router.route('/login')
  .post(loginUser)

// Profile
router.route('/profile')
  .get(getUserProfile)


export default router