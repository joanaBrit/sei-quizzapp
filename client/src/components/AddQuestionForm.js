import axios from 'axios'

import NavBar from './NavBar'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function AddQuestionForm( { username, quizId, token }) {

  const fields = [
    {
      Question: 'text',
      Answer: 'Username',
    }
  ]

  async function submitQuestion(event){
    event.preventDefault()
    console.log('handle submit')
    console.log(event.target[0].value, event.target[1].value)

    const { data } = await axios.get('/api/quizzes')
    console.log(data)


    axios.post(`/api/quizzes/${quizId}/questions`,     {
      question: event.target[0].value,
      answer: event.target[1].value,
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
  function handleChange(){
    console.log('change')
  }

  return (
    <section>
      <header>
        <NavBar
          quizname={'quizname'}
        />
        <div className='username'>
          <span>{'username'}</span>
        </div>
      </header>
      <main>
        <section>
          <h1 className="title text-center text-uppercase mb-5">Add a Question to {/* quiz.id */ } </h1>

        </section>
        <Container>
          <Row>
            <Col as="form" xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={submitQuestion} autoComplete='off'>

              <label hidden htmlFor='question'>question</label>
              <input type='text' name='question' placeholder='Your question' onChange={handleChange} id='questionId'
              />
              <input type='text' name='question' placeholder='Correct answer' onChange={handleChange} id='questionId'
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