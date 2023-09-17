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
  const [formData, setFormData] = useState(stateValues(fields))
  const [errors, setErrors] = useState('')


  // * Component render
  useEffect(() => {
    async function fillUpForm() {
      try {
        const { data } = await onLoad()
        setFormData(data)
      } catch (error) {
        console.log(error)
        setErrors(error)
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
      console.log(error)
      const errorMessage = error.response.data._message || 'An error occurred.'
      
      // const errorData = error.response.data
      // // be clear with the error for user understanding
      // if (errorData.email) {
      //   errorMessage.push('The email adrress is invalid.')
      // }

      // if (errorData.errors.password && errorData.errors.password.length < 4) {

      //   // Remenber thata there is a minLenght in the backend of 4 letters
      //   errorMessage.push('The password must have at least 4 characters long.')
      // }
      // if (errorMessages.length < 4) {
      //   const errorMessage = errorMessages.join(' ')
      //   console.error(errorMessage)
      //   setErrors(errorMessage)
      // }

      console.error(errorMessage)
      setErrors(errorMessage)

    }

  }
  //  ! Need to fix this JSX
  return (
    <section className='centred'>
      <h2 className="text-center fs-2 mb-5">{title}</h2>
      <Container>
        <Row>
          {fields.length > 0 ?
            <Col as="form" xs={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit} autoComplete='off'>
              {fieldValues(fields).map(field => {
                const { type, name, variable } = field
                return (
                  <Fragment key={variable}>
                    <label hidden htmlFor={variable}>{name}</label>
                    <input
                      type={type}
                      name={variable}
                      placeholder={name}
                      value={formData[variable]}
                      onChange={handleChange}
                      id={variable}
                    />
                  </Fragment>
                )
              })}
              {errors && <p className='text-warning bold text-center mt-5'>{errors}</p>}
              <button type="submit" className='btn btn-sm d-block m-auto mt-5'>{title}</button>
            </Col>
            :
            'Form Error'
          }
        </Row>
      </Container>
    </section>
  )
}
