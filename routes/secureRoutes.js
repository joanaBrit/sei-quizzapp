import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// The secure route is a function that wil be executed just before a request hits the controller for a secure endpoint
// The point is to check whether the user is authenticated and add a user id to the request if this is the case

export const secureRoute = async (req, res, next) => { 
  try {
    console.log( 'HIT THE SECURE ROUTE')

    // 1.  Check to see if the user has sent an authorization header with their request 
    if (!req.headers.authorization) throw new Error('Missing authorization header')

    // 2. Remove the 'Bearer ' from the beginning of the token, saving it to a token variables
    const token = req.headers.authorization.replace('Bearer ', '')

    // 3. Use jwt method to verify the validity of the token
    // we are using the secret here to sign the json web token. The secret was generated using a password generator.
    // If the token is valid, the verify method returns the payload
    // The secret is part of the jwt token, which is generated when the user logs in. 
    // So the jwt.verify method essentially just checks if the secret in the token is the same as in our .env file. 
    // If it fails, it will throw an error such as 'Invalid signature' 
    const payload = jwt.verify(token, process.env.SECRET)

    // 4. if the token is valid, then we want to use the sub/subject from the token to check to see whether that user exists in our database 
    const foundUser = await User.findById(payload.sub)


    // 5. If they do not exist, invalidate the request by sending a 401 unauthorized 
    if (!foundUser) throw new Error('User not found')

    // 6. Otherwise, add the foundUser object to the request object
    req.user = foundUser

    // 7. Send the request to the next controller
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json( { error: 'Unauthorized ' })
  }
}