import mongoose from 'mongoose'
import 'dotenv/config'

// Import models
import Quiz from '../models/quiz.js'
import User from '../models/user.js'

// Import data
import quizData from './data/quizzes.js'
import userData from './data/users.js'


// seed database function
const seedDatabase = async () => {
  try {
    // 1. connect to the data base
    await mongoose.connect(process.env.CONNECTION_STRING) // ! I am not sure if it is correct to awaiit mongoose.connect()
    console.log('🚀 Connection to the database established')

    // 2. Delete all users in the database until now
    const { deletedCount: deletedUsers } = await User.deleteMany()
    console.log(`❌ deleted ${deletedUsers} users from the database`)

    // 3. Delete all quizzes in the database until now 
    // ! Since users cannot alter the quizzes, maybe it is more appropriate to only delete questions? 
    // ! But since we are rebuilding afterwards anyways, it does not make as much of a difference 
    const { deletedCount: deletedQuizzes } = await Quiz.deleteMany()
    console.log(`❌ deleted ${deletedQuizzes} quizzes from the database`)

    // 4. Plant seed with users in database
    const newUsers = await User.create(userData)
    console.log(`🌱 Panted seed by adding ${newUsers.length} users to the database`)

    // 5. Plant seed with quizzes in database
    // 5.1 Add a unique ID to all questions
    const quizDataWithId = quizData.map( quiz => {
      const questionsWithId = quiz.questions.map( question => {
        const randomUser = Math.floor(Math.random() * newUsers.length)
        return { ...question, addedBy: newUsers[randomUser]._id }
      })
      quiz.questions = questionsWithId
      return quiz
    })
    // 5.2 Plant seed for quizzes in database
    const newQuizzes = await Quiz.create(quizDataWithId)
    console.log(`🌱 Planted seed by adding ${newQuizzes.length} quizzes with ${quizData[0].questions.length} and ${quizData[1].questions.length} questions to the database`)
    console.log(newQuizzes)
    // Close connection to the database 
    await mongoose.connection.close()
    console.log('👋 Connecton to the database closed')

    console.log('SEED FUNCTION')
  } catch (error) {
    console.log(error)
    
    //close connection to the database 
    await mongoose.connection.close()
    console.log('❌👋 Connecton to the database closed after error')
  }
}


// call seed database function 
seedDatabase()