import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import NavBar from './NavBar'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function handleSubmit(){
  console.log('handle submit')
  //I guess this is where the post request should be sent 
}
function handleChange(){
  console.log('handle change')
  //I guess this is where the post request should be sent 
}

export default function AddQuestionForm( { username, quiz }) {
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
            <Col as="form" xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit} autoComplete='off'>

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