import { Link } from 'react-router-dom'

export default function NavBar( { quizname }){
  return (
    <nav>
      <Link to= '/quizzes/:quizId'> Take { quizname } Quiz </Link>
      <Link to= '/quizzes'> View all Quizzes </Link>
    </nav>

  )
}