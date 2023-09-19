import RegisterForm from './Form'
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
      name: 'Password Confirmation',
    }
  ]

  function register(formData) {
    return axios.post('/api/register', formData)
  }

  return (
    <section className='container'>
      <h1 className="title text-uppercase mb-5">Sei Quiz App</h1>
      <RegisterForm title="Register" request={register} fields={fields} redirect="/" />
    </section>
  )
}