
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'



export default function TakingQuiz( { token }){

  const { id } = useParams()
  const [quiz, setQuiz] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState('')
  const [reveal, setReveal] = useState([false])
  const newReveal = []
  const navigate = useNavigate()
  
  useEffect(() => {
    async function getQuizSingle(){
      const { data } = await axios.get(`/api/quizzes/${id}`)
      setQuiz(data)
    }
    getQuizSingle()
  }, [id])

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
        newReveal.push(reveal[i])
      }
      setReveal(newReveal)
      return answer
    }))
  }

  async function deleteQuestion(questionId) {
    axios.delete(`/api/quizzes/${id}/questions/${questionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async function (response) {
        navigate('/landing')
      })
      .catch(function (error) {
        console.log(error)
      })

  }
  
  return (
    <>
      <section id='container'>
        <h1>{quiz && quiz.title}</h1>
        {quiz && quiz.questions.map(({ question, _id },i) => {
          return (
            <div key={i} className="flip-card">
              <div className='add-question'>
                <Link to={`/quizzes/${id}/questions/${_id}`}>
                  <Button type='button' className='btn btn-sm btn-block'>Update Question</Button>
                </Link>
              </div>
              <div className='add-question'>

                <Button type='button' className='btn btn-sm btn-block'  onClick={deleteQuestion.bind(this, _id)}>Delete Question</Button>

              </div>
              <div className="flip-card-inner">
                <div id={i} onClick={handleClick} className={reveal[i] ? 'flip-card-back' : 'flip-card-front'}>
                  <h5><div id={i} onClick={handleClick}>{question}</div></h5>
                </div>
                <div id={i} onClick={handleClick} className={!reveal[i] ? 'flip-card-back' : 'flip-card-front'}>
                  <h5><div id={i} onClick={handleClick}>{correctAnswers[i]}</div></h5>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </>
  )
}
