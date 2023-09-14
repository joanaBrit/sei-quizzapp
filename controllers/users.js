import User from '../models/user.js'
import jwt from 'jsonwebtoken'


// * Register
export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    console.log('User Created', user)
    return res.status(201).json({ message: `Welcome ${user.username} to SEI quizz⚡` })
  } catch (error) {
    return res.status(422).json(error)
  }
}


// * Login
export const loginUser = async (req, res) => {

  const { email, password } = req.body
  

  try {
    const userLogin = await User.findOne({ email })

    // If the email don't match user
    if (!userLogin) throw new Error('User Not Found')
    // if Invalid Password
    if (!userLogin.validatePassword(password)) throw new Error('Incorrect Password')
    // send the token if they match
    const token = jwt.sign({ sub: userLogin._id }, process.env.SECRET, { expiresIn: '10d' })

    return res.json({ message: `Welcome back, ${userLogin.username}, nice to see you!`, token: token })
  } catch (error) {
    return res.status(401).json({ error: '⛔ Unauthorized' })
  }
}


// * Create a profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id)
  return res.json(user)
}
