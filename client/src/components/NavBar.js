import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { removeToken } from '../utils/auth'

export default function NavBar( { token, quizname, username, id, setReload }){

  const [userId, setUserId] = useState()
  const [quizzes, setQuizzes] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function getQuizzes () {
      const { data } = await axios.get('/api/quizzes')
      setQuizzes(data)
    }
    getQuizzes()
  }, [])

  useEffect(() => {
    async function getUser () {
      if (!token) {
        return
      } 
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace('-', '+').replace('_', '/')
      console.log(JSON.parse(window.atob(base64)).sub)
      setUserId(JSON.parse(window.atob(base64)).sub)
    }
    getUser()
  })

  function logOut(e){
    e.preventDefault()
    console.log('Logout')
    // removeToken
    removeToken()
    // Navigate to login
    navigate('/')
  }

  return (
    <nav>
      <NavDropdown title="Quiz List" className={id && id ? 'dropdown-list no-decoration' : 'hidden'}>
        {quizzes && quizzes.map((quiz, i) => {
          return (<Link className='quiz-list no-decoration' onClick={e => setReload(true)} key={i} to= {`/quizzes/${quizzes[i]._id}`}>{quiz.title}</Link>)
        })}
      </NavDropdown>
      <Link className={id && id ? 'no-decoration' : 'hidden'} to= '/landing'> View all Quizzes </Link>
      <div className='username'>
        { username ?
          <NavDropdown className='dropdown-list' title={`Welcome ${username}`}>
            <Link className='no-decoration' onClick={logOut}> Log out </Link>
          </NavDropdown>
          :
          <p>Welcome</p>
        }
      </div>
    </nav>
  )
}