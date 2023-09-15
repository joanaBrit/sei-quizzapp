
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function TakingQuiz(){

  const { quizId } = useParams()
  const [quiz, setQuiz] = useState()

  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quiz/${quizId}`)
      console.log(data)
      setQuiz(data)
    }
    getQuizSingle()
  }, [])

  return (
    <>
      <section id='Quiz-container'>
        <h1>{quiz && quiz.title}</h1>
        <section id='question-container'>
          {quiz && quiz.map((questions, i) => {
            return <p key={i}>
              {questions}
            </p>
          })}
        </section>
      </section>
    </>
  )
}
