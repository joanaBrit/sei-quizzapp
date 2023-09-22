import Form from './Form'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default function Login( { token, setToken, setUsername } ) {
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

  async function login(formData) {
    const response = await axios.post('/api/login', formData)
    const token = response.data.token
    const username = response.data.username
    setToken(response.data.token)
    setUsername(response.data.username)
    console.log('TOKEN IN HOME.JS', token)
    return response

  }

  return (
    <section className='container'>
      <h1 className="title text-uppercase mb-5">Sei Quiz App</h1>
      <section className='form'>
        <Form title="Login" request={login} fields={fields} redirect="/landing" />
        <Link to='/register' className='link-btn'>
          <div className='regl'>
            <button type="submit" className='btn btn-sm col-10 d-block m-auto mt-1 '>Register</button>
          </div>
        </Link>
      </section>
    </section>
  )
}