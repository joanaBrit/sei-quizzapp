
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getToken } from '../utils/auth'

export default function UpdatingQuestion () {

  const { quizId, questionId } = useParams()


  const [quiz, setQuiz] = useState()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quizzes/${quizId}`)
      setQuiz(data)
      data.questions.forEach(question =>{
        if ( question._id === questionId ) {
          setQuestion(question.question)
          setAnswer(question.answer)
        }
      })
    }
    getQuizSingle()
  }, [])

  function handleChangeQuestion (e) {
    setQuestion(e.target.value)
  }
  function handleChangeAnswer (e) {
    setAnswer(e.target.value)
  }


  function uploadQuestion (e) {
    e.preventDefault()
    axios.put(`/api/quizzes/${quizId}/${questionId}`,{
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  }

  return (
    <form onSubmit={ (e) => uploadQuestion(e)}>
      <input type='text' value={question} onChange={(e) => handleChangeQuestion(e)} />
      <input type='text' value={answer} onChange={(e) => handleChangeAnswer(e)}/>
      <button type='submit'>Submit</button>
    </form>
  )
}