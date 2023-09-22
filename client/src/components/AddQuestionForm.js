import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function AddQuestionForm( { username, token }) {

  const fields = [
    {
      Question: 'text',
      Answer: 'Username',
    }
  ]
  const { quizId } = useParams()
  const [ questionId, setQuestionId ] = useState()
  const navigate = useNavigate()

  async function submitQuestion(event){
    event.preventDefault()

    await axios.post(`/api/quizzes/${quizId}/questions`,     {
      question: event.target[0].value,
      answer: event.target[1].value,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async function (response) {
        setQuestionId(response.data.questions[ response.data.questions.length - 1 ]._id)
      })
      .catch(function (error) {
        console.log(error)
      })

    navigate(`/quizzes/${quizId}`)    
    
  }

  return (
    <section>
      <main>
        <section>
          <h1 className="title text-center text-uppercase mb-5">Add a Question to {/* quiz.id */ } </h1>

        </section>
        <Container>
          <Row>
            <Col as="form" xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={submitQuestion} autoComplete='off'>

              <label hidden htmlFor='question'>question</label>
              <input type='text' name='question' placeholder='Your question' id={questionId}
              />
              <input type='text' name='answer' placeholder='Correct answer'id={questionId}
              />              
              {/* {errors && <p className='text-warning bold text-center mt-5'>{errors}</p>} */}
              <button type="submit">Submit</button>
            </Col>
          </Row>
        </Container>
      </main>
    </section>

  )
}