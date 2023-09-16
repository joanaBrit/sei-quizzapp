import { useState, Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../utils/auth'
import { stateValues, fieldValues } from '../utils/Common'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



export default function RegisterForm({ title, request, fields, redirect, onLoad }) {

  // * Variable
  const navigate = useNavigate()

  // * State
  const [errors, setErrors] = useState('')
  const [formData, setFormData] = useState(stateValues(fields))

  // * Component render
  useEffect(() => {
    async function fillUpForm() {
      try {
        const { data } = await onLoad()
        setFormData(data)
      } catch (error) {
        const errorMessage = (error.response.data && error.response.data.mensage) | 'An error ocurred'
        console.log(error)
        setErrors(errorMessage)
      }
    }
    if (onLoad) {
      console.log('On Load Checked')
      fillUpForm()
    }
  }, [onLoad])

  // * Handler Functions
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // set errors to the starting point
    setErrors('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await request(formData)
      if (data.token) {
        // set token to storage
        setToken(data.token)
      }

      // If redirect
      if (redirect) {
        navigate(redirect)
      }

    } catch (error) {
      // const errorMessage = error.response.data.mensage  
      console.error(error)
      // setErrors(errorMessage)
    }
  }
  //  ! Need to fix this JSX
  return (
    <section className='form'>
      <h1>{title}</h1>
      <Container>
        <Row>
          {/* {fields.legth > 0 ? */}
          <Col as="form" xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit} autoComplete='off'>
            {/* {fieldValues(fields).map(field => {
                const { type, name } = field */}
            {/* return ( */}

            {/* // <Fragment key={variable}> */}
            <>
              <label hidden htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <label hidden htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <label hidden htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label hidden htmlFor="passwordConfirmation">Password Confirmation</label>
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="PasswordConfirmation"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
            </>
            {/* // </Fragment> */}
            {/* ) */}
            {/* })} */}
            {errors && <p className='text-warning bold text-center mt-5'>{errors}</p>}
            <button type="submit" className='btn btn-sm btn-light btn-block m-auto mt-5'>{title}</button>
          </Col>
          {/* :
            'Form Error'
          } */}
        </Row>
      </Container>
    </section>
  )
}