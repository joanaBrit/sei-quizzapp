import axios from 'axios'

export default function Register() {

  const fields = [

    {
      type: 'text',
      name: 'Username',
    },
    {
      type: 'email',
      name: 'Email',
    },
    {
      type: 'password',
      name: 'Password',
    },
    {
      type: 'password',
      name: 'password Confirmation',
    }
  ]

  return (
    function register() {
      return axios.post('/register')
    }
  )
}