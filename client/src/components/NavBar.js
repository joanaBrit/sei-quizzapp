import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function NavBar( { token, quizname, username, id, setReload }){

  const [userId, setUserId] = useState()
  const [quizzes, setQuizzes] = useState()

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

  return (
    <nav>
      <NavDropdown title="Quiz List" className={id && id ? 'dropdown-list' : 'hidden'}>
        {quizzes && quizzes.map((quiz, i) => {
          return (<Link className='quiz-list' onClick={e => setReload(true)} key={i} to= {`/quizzes/${quizzes[i]._id}`}>{quiz.title}</Link>)
        })}
      </NavDropdown>
      <Link className={id && id ? '' : 'hidden'} to= '/landing'> View all Quizzes </Link>
      <div className='username'>
        <span> Hello {username}</span>
      </div>
    </nav>
  )
}

// Logout Function
// export default function Nav({ user }){

//   const [show, setShow] = useState(false)

//   // ! location variables
//   const navigate = useNavigate()

//   function logOut(){
//     // removeToken
//     removeToken()
//     // Navigate to login
//     navigate('/login')
//   }