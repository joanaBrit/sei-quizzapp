import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import TakingQuiz from './components/TakingQuiz'
import UpdatingQuestion from './components/UpdatingQuestion'
import Landing from './components/Landing'
import Register from './components/Register'
import Home from './components/Home'

export default function App() {
  useEffect(() => {
    async function getData() {
      try {
        await axios.get('/api/')
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quizzes/:id' element={<TakingQuiz />} />
          <Route path='/quizzes/:quizId/:questionId' element={<UpdatingQuestion />} />
          <Route path='/register' element={<Register />} />
          <Route path='/landing' element={<Landing />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
