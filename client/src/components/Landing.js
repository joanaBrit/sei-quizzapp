import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

export default function Landing() {
  const [quizzes, setQuizzes] = useState([])
  const username = localStorage.getItem('username')
  useEffect(() => {
    async function getQuizzesData() {
      try {
        const { data } = await axios('/api/quizzes')
        setQuizzes(data)
      } catch (error) {
        console.log(error)
      }
    }
    getQuizzesData()
  }, [])


  return (
    <section>
      <nav>
        <span>{username}</span>
      </nav>
      <main>
        <section >
          <h1 className="title text-center text-uppercase mb-5">Sei Quizz App</h1>
          {quizzes.map((quiz, _id) => <div key={_id}>
            {quiz.title}
            {/* {quiz.image} */}
          </div>)}
        </section>
        <section>
          <p>Feeling inspired?</p>
          {/* This link should lead to `/quizzes/${_id}/questions` */}
          <Link to='/quizzes/:quizId'>
            <Button type='button' className='btn btn-sm btn-blue btn-block'>Add some Questions</Button>
          </Link>
        </section>
      </main>
    </section>
  )
}