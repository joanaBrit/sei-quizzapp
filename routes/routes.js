import express from 'express'
import { registerUser, loginUser, getUserProfile } from '../controllers/users.js'

const router = express.Router()


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