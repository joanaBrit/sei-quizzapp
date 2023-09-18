import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import NavBar from './NavBar'

export default function AddQuestionForm( { username, quiz }) {
  return (
    <section>
      <header>
        <NavBar
          quizname={'quizname'}
        />
        <div className='username'>
          <span>{'username'}</span>
        </div>
      </header>
      <main>
        <section>
          <h1 className="title text-center text-uppercase mb-5">Add a Question to {/* quiz.id */ } </h1>

        </section>
        <section>
          <p>Feeling inspired?</p>
          <Link to='/quizzes/:quizId'>
            <Button type='button' className='btn btn-sm btn-blue btn-block'>Add some Questions</Button>
          </Link>
        </section>
      </main>
    </section>

  )
}