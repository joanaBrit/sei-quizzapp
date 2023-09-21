
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default function UpdatingQuestion ( { token } ) {


  const { quizId, questionId } = useParams()


  const [quiz, setQuiz] = useState()
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')

  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quizzes/${quizId}`)
      setQuiz(data)
      data.questions.forEach(question =>{
        if ( question._id === questionId ) {
          setNewQuestion(question.question)
          setNewAnswer(question.answer)
        }
      })
    }
    getQuizSingle()
  }, [])

  function handleChangeQuestion (e) {
    setNewQuestion(e.target.value)
  }
  function handleChangeAnswer (e) {
    setNewAnswer(e.target.value)
  }


  async function uploadQuestion (e) {
    
    e.preventDefault()
    await axios.put(`/api/quizzes/${quizId}/questions/${questionId}`, {
      question: newQuestion,
      answer: newAnswer,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
    
  }
  return (
    <>
      <Link to={`/quizzes/${quizId}`}>
        <Button type='submit'>Back to Quiz</Button>
      </Link>
      <form onSubmit={(e) => uploadQuestion(e)}>
        <input type='text' name='question' className='input-text' autoComplete='off' value={newQuestion} onChange={(e) => handleChangeQuestion(e)} />
        <input type='text' name='answer' className='input-text' autoComplete='off' value={newAnswer} onChange={(e) => handleChangeAnswer(e)}/>
        <Button type='submit' className='btn btn-sm col-10 d-block m-auto mt-1 '>Submit</Button>
      </form>
    </>
  )
}