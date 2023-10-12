import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'



export default function TakingQuizOneByOne( { token, setShowAll, setId, reload, setReload } ){

  const { id } = useParams()
  const [quiz, setQuiz] = useState('')
  const [correctAnswers, setCorrectAnswers] = useState('')
  const [reveal, setReveal] = useState([false])
  const [popup, setPopup] = useState(false)
  const [creator, setCreator] = useState([])
  const [questionId, setQuestionId] = useState()
  const [counterForId, setCounterForId] = useState()
  const [questionNumber, setQuestionNumber] = useState(0)
  const newReveal = []
  const [totalQuestions, setTotalQuestions] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    async function getQuizSingle(){
      setReload(false)
      const userCreated = []
      setId(true)
      const { data } = await axios.get(`/api/quizzes/${id}`)
      let counter = 0
      setQuiz(data)
      data && data.questions.map(( { addedBy } ) => {
        counter++
        if (!token) {
          console.log('no token')
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
      counter--
      setCreator([...userCreated])
      setTotalQuestions(counter)
    }
    getQuizSingle()
  }, [popup, reload])
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
  
  function changePage(e) {
    let i = questionNumber
    if (e.target.id === 'next'){
      i++
    } else if (e.target.id === 'prev'){
      i--
    }
    setQuestionNumber(i)
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
  
  function clickedNo(){
    setPopup(false)
  }
  
  function changeView() {
    setShowAll(true)
  }
  
  return (
    <>
    
      <section id='container'>
        <h1>{quiz && quiz.title}</h1>
        <Button variant='outline-primary' className='switch-btn' onClick={changeView}>Switch View</Button>
        {(totalQuestions !== 0 && totalQuestions !== -1) ? <>
          <Button id='prev' variant='outline-primary' className={questionNumber !== 0 ? 'btn btn-outline-primary' : 'disabled btn btn-outline-primary' } onClick={(e) => changePage(e)}>Previous Question</Button>
          <Button id='next' variant='outline-primary' className={questionNumber !== totalQuestions ? 'btn btn-outline-primary' : 'disabled btn btn-outline-primary' } onClick={(e) => changePage(e)}>Next Question</Button>
        </>
          :
          <></>
        }
        <div key={questionNumber} className="flip-card">
          {(totalQuestions !== 0 && totalQuestions !== -1) ?
            <div className="flip-card-inner">
              <div id={questionNumber} onClick={handleClick} className={reveal[questionNumber] ? 'flip-card-back' : 'flip-card-front'}>
                <h5><div id={questionNumber} className='wrap-text' onClick={handleClick}>{quiz && quiz.questions[questionNumber] && quiz.questions[questionNumber].question}</div></h5>
              </div>
              <div id={questionNumber} onClick={handleClick} className={!reveal[questionNumber] ? 'flip-card-back' : 'flip-card-front'}>
                <h5><div id={questionNumber} className='wrap-text' onClick={handleClick}>{correctAnswers[questionNumber]}</div></h5>
              </div>
              <div className='add-question update-question'>
                <Button onClick={e => deleteQuestionConfirm(quiz && quiz.questions[questionNumber] && quiz.questions[questionNumber]._id)} type='button' variant='outline-primary' className={creator && creator[questionNumber] ? 'btn btn-outline-primary' : 'hidden'}>Delete Question</Button>
                <Link to={`/quizzes/${id}/questions/${quiz && quiz.questions[questionNumber] && quiz.questions[questionNumber]._id}`}>
                  <Button type='button' variant='outline-primary' className={creator && creator[questionNumber] ? 'btn btn-outline-primary' : 'hidden'}>Update Question</Button>
                </Link>
              </div>
            </div>
            :
            <h3>Unfortunately this quiz is empty</h3>
          }
        </div>
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
