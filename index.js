import express from 'express'
import mongoose from 'mongoose'
import router from './routes/routes.js'
import 'dotenv/config'

const app = express()


// * MIDDLEWARE
app.use(express.json())
app.use((req, res, next) => {
  console.log(`Request received ${req.method}, at ${req.url}`)
  next()
})


// * ROUTES
app.use(router)


// * NOT FOUND ROUTE 
app.use((req, res) => {
  return res.status(404).json( { message: "Route not found" } )
})

// * LISTEN & STARTSERVER

//Listen and start server
const startServer = async () => {
  try {
    // Connect to database with connection string from above
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log(`🌱 Database connection established`)    
    // Listen
    app.listen(process.env.PORT, () => {
      console.log(`👂 Listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log(' 🆘 Something went wrong when starting server')
    console.log(error)
  }
}

//startserver
startServer()