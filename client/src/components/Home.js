import RegisterForm from './RegisterForm'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Login() {
  const fields = [
    {
      type: 'email',
      name: 'Email',
    },
    {
      type: 'password',
      name: 'Password',
    }
  ]

  function login(formData) {
    return axios.post('/api/login', formData)
  }

  return (
    <section className='centred'>
      <h1 className="title text-center text-uppercase mb-5">Sei Quizz App</h1>
      <section className='form-login'>
        <RegisterForm title="Login" request={login} fields={fields} redirect="/landing" />
        <Link to='/register' className='link-btn'>
          <button type="submit" className='btn btn-sm btn-blue btn-block m-auto btn-primary'>Register</button>
        </Link>
      </section>
    </section>
  )
}