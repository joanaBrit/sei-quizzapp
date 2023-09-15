import express from 'express'
import { getSingleQuestion, getSingleQuiz, updateSingleQuestion } from '../controllers/quiz.js'

import { registerUser, loginUser, getUserProfile } from '../controllers/users.js'

const router = express.Router()

router.route('/quizzes/:id')
  .get(getSingleQuiz)

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