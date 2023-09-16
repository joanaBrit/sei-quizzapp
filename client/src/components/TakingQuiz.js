
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function TakingQuiz(){

  const { id } = useParams()
  const [quiz, setQuiz] = useState('')
  const [answer, setAnswer] = useState('')
  const [userInput, setUserInput] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')

  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quizzes/${id}`)
      setQuiz(data)
    }
    getQuizSingle()
  }, [])

  const handleChange = (event) => {
    setUserInput(event.target.value)
  }

  const handleClick = () => {
    setAnswer(userInput)
  }

  useEffect(() => {
    console.log(answer)
  }, [answer])

  

  return (
    <>
      <section id='Quiz-container'>
        <h1>{quiz && quiz.title}</h1>
        {quiz && quiz.questions.map(({ question },i) => {
          return (
            <section key={i} id='question-container'>
              <p>{question}</p>
              <input placeholder='Answer' autoComplete='off' onChange={handleChange}></input>
              <button onClick={handleClick}>Submit</button>
            </section>
          )
        })}
      </section>
    </>
  )
}
