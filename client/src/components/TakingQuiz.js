
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'



export default function TakingQuiz( { token, setShowAll, setId, reload, setReload } ){

  const { id } = useParams()
  const [quiz, setQuiz] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState('')
  const [reveal, setReveal] = useState([false])
  const [popup, setPopup] = useState(false)
  const [creator, setCreator] = useState([])
  const [questionId, setQuestionId] = useState()
  const [counterForId, setCounterForId] = useState()
  const newReveal = []
  const navigate = useNavigate()
  
  useEffect(() => {
    setReload(false)
    async function getQuizSingle(){
      const userCreated = []
      const { data } = await axios.get(`/api/quizzes/${id}`)
      setQuiz(data)
      setId(true)
      data && data.questions.map(( { addedBy } ) => {
        if (!token) {
          return
        } 
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        if (addedBy === JSON.parse(window.atob(base64)).sub) {
          userCreated.push(true)
        } else {
          userCreated.push(false)
        }
      })
      setCreator([...userCreated])
    }
    getQuizSingle()
  }, [reload, popup])

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

  async function clickedYes(){
    axios.delete(`/api/quizzes/${id}/questions/${questionId[counterForId]}`, {
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
    setQuestionId()
    setPopup(false)
  }

  function clickedNo(){
    setPopup(false)
  }
  
  function deleteQuestionConfirm(questId) {
    const newId = quiz.questions.map(({ _id }, i) => {
      if ( _id === questId ) {
        setCounterForId(i)
        return (_id)
      }
    })
    setQuestionId(newId)
    setPopup(true)
  }

  function changeView() {
    setShowAll(false)
  }
  
  return (
    <>
      <section id='container'>
        <h1>{quiz && quiz.title}</h1>
        <Button variant='outline-primary' className='switch-btn' onClick={changeView}>Switch View</Button>
        {(quiz.questions && quiz.questions.length !== 0) ? quiz && quiz.questions.map(({ question, _id },i) => {
          return (
            <div key={i} className="flip-card">
              <div className="flip-card-inner">
                <div id={i} onClick={handleClick} className={reveal[i] ? 'flip-card-back' : 'flip-card-front'}>
                  <h5><div id={i} className='wrap-text' onClick={handleClick}>{question}</div></h5>
                </div>
                <div id={i} onClick={handleClick} className={!reveal[i] ? 'flip-card-back' : 'flip-card-front'}>
                  <h5><div id={i} className='wrap-text' onClick={handleClick}>{correctAnswers[i]}</div></h5>
                </div>
                <div className='add-question update-question'>
                  <Button onClick={e => deleteQuestionConfirm(_id)} type='button' variant='outline-primary' className={creator && creator[i] ? 'btn btn-sm btn-block' : 'hidden'}>Delete Question</Button>
                  <Link to={`/quizzes/${id}/questions/${_id}`}>
                    <Button type='button' variant='outline-primary' className={creator && creator[i] ? 'btn btn-sm btn-block' : 'hidden'}>Update Question</Button>
                  </Link>
                </div>
              </div>
            </div>
          )
        })
          :
          <h3>Unfortunately this quiz is empty</h3>
        }
      </section>
      <div className={popup ? 'popup' : 'hidden'}>
        <div className={popup ? 'popup_inner' : 'hidden'}>
          <h1 className={popup ? 'h1' : 'hidden'}>Are you sure you want to delete the question?</h1>
          <div className='btn-container'>
            <Button className={popup ? 'btn btn-sm btn-block' : 'hidden'} onClick={clickedYes}>Yes</Button>
            <Button className={popup ? 'btn btn-sm btn-block' : 'hidden'} onClick={clickedNo}>No</Button>
          </div>
        </div>
      </div>
    </>
  )
}


