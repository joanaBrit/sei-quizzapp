
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


export default function TakingQuiz(){

  const { id } = useParams()
  const [quiz, setQuiz] = useState('')
  const [answer, setAnswer] = useState('')
  const [userInput, setUserInput] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState('')
  const [target, setTarget] = useState()
  const [tick, setTick] = useState([])
  const newTicks = []
  
  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quizzes/${id}`)
      setQuiz(data)
    }
    getQuizSingle()
  }, [tick])

  function handleChange(event) {
    setUserInput(event.target.value)
  }

  function handleClick(e) {
    e.preventDefault()
    setAnswer(userInput.toLowerCase())
    setCorrectAnswers(quiz && quiz.questions.map(({ answer }) => {
      return answer.toLowerCase()
    }))
  }

  useEffect(() => {
    function checkAnswer() {
      newTicks.push(correctAnswers && correctAnswers.map((correctAnswer, i) => {
        if (parseFloat(target.id) === i) {
          if (answer === correctAnswer){
            return 'correct'
          } else {
            return 'wrong'
          }
        } else {
          return tick[i]
        }
      }))
      setTick(...newTicks)
    }
    checkAnswer()
  }, [answer])

  

  return (
    <>
      <section id='Quiz-container'>
        <h1>{quiz && quiz.title}</h1>
        {quiz && quiz.questions.map(({ question },i) => {
          return (
            <section key={i} className='question-container'>
              <p>{question}</p>
              <form onSubmit={handleClick}>
                <input placeholder='Answer' className='btnans' autoComplete='off' onChange={handleChange}></input>
                <button id={i} type='submit' onClick={(e) => setTarget(e.currentTarget)}>Submit</button>
                <p>Answer: {tick[i] === 'correct' ? <>&#x2713;</> : <>&times;</>}</p>
              </form>
            </section>
          )
        })}
      </section>
    </>
  )
}
