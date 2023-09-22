import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import axios from 'axios'
import TakingQuiz from './components/TakingQuiz'
import TakingQuizOneByOne from './components/TakingQuizOneByOne'
import UpdatingQuestion from './components/UpdatingQuestion'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Home'
import AddQuestionForm from './components/AddQuestionForm'
import NavBar from './components/NavBar'

export default function App() {
  useEffect(() => {
    async function getData() {
      try {
        await axios.get('/')
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  const [token, setToken] = useState()
  const [username, setUsername] = useState()
  const [showAll, setShowAll] = useState(false)
  const [id, setId] = useState(false)
  const [reload, setReload] = useState(false)

  return (
    <>
      
      <BrowserRouter>
        <header>
          <NavBar 
            token={ token }
            username= { username }
            id={ id }
            setReload={setReload}
          />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Login 
              setToken={setToken} 
              setUsername={setUsername}
            />}/>
            <Route path='/quizzes/:id' element={ showAll ? <TakingQuiz 
              token = { token }
              setShowAll = {setShowAll}
              setId={setId}
              reload={reload}
              setReload={setReload}
            /> : <TakingQuizOneByOne 
              token = { token }
              setShowAll = {setShowAll}
              setId={setId}
              reload={reload}
              setReload={setReload}
            />} />
            <Route path='/quizzes/:quizId/questions/:questionId' element= {<UpdatingQuestion 
              token = { token }
            />} />
            <Route path='/register' element={<Register />} />
            <Route path='/landing' element={<Landing
              setId={setId}
            />} />
            <Route path='/quizzes/:quizId/questions' element={<AddQuestionForm 
              token = { token }
            />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
