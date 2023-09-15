import express from 'express'
import { getSingleQuestion, getSingleQuiz, updateSingleQuestion } from '../controllers/quiz.js'

import { registerUser, loginUser, getUserProfile } from '../controllers/users.js'

const router = express.Router()

router.route('/quiz/:quizId')
  .get(getSingleQuiz)

router.route('/quiz/:quizId/:questionId')
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