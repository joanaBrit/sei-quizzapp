
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function TakingQuiz(){

  const { id } = useParams()
  const [quiz, setQuiz] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState('')
  const [reveal, setReveal] = useState([])
  const newReveal = []
  
  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quizzes/${id}`)
      setQuiz(data)
    }
    getQuizSingle()
  }, [])

  function handleClick(e) {
    e.preventDefault()
    setCorrectAnswers(quiz && quiz.questions.map(({ answer }, i) => {
      if (parseFloat(e.target.id) === i) {
        if (reveal[i]) {
          newReveal[i] = !reveal[i]
        } else {
          newReveal.push(true)
        }
      } else {
        newReveal.push(false)
      }
      console.log()
      setReveal(newReveal)
      return answer
    }))
  }
  console.log(reveal)
  
  return (
    <>
      <section id='Quiz-container'>
        <h1>{quiz && quiz.title}</h1>
        {quiz && quiz.questions.map(({ question },i) => {
          return (
            <section key={i} className='question-container'>
              <h5 id={i} onClick={handleClick}>{question}</h5>
              <p>{(reveal && reveal[i]) ? correctAnswers[i] : ''}</p>
            </section>
          )
        })}
      </section>
    </>
  )
}
