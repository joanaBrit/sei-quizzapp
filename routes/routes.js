import express from 'express'
import { getSingleQuiz,updateSingleQuestion } from '../controllers/quiz.js'

import { registerUser, loginUser, getUserProfile } from '../controllers/users.js'

const router = express.Router()

router.route('/quizzes/:id')
  .get(getSingleQuiz)
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