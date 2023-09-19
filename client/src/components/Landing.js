import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'

export default function Landing() {
  const [quizzes, setQuizzes] = useState([])
  const [quizId, setQuizId] = useState()
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
          {quizzes.map(({ title, _id }, i) => <div key={i}>
            <Link to={`/quizzes/${_id}`}> {/* Just an idea on how this should look like, we can change the link or anything to other things, but i had to use {title, _id } to make things easier */}
              {title}
              {/* {quiz.image} */}
            </Link>
          </div>)}
        </section>
        <section>
          <div className='add-question'>
            <p>Feeling inspired?</p>
            <Link to={`/quizzes/${quizId}`}>
              <Button type='button' className='btn btn-sm btn-block'>Add Questions</Button>
            </Link>
          </div>
        </section>
      </main>
    </section>
  )
}