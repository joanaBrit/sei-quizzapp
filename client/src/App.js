import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import TakingQuiz from './components/TakingQuiz'

export default function App() {
  useEffect(() => {
    async function getData(){
      try {
        // await axios.get('/api/quiz/') // <---- Replace with your endpoint to test the proxy
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/quiz/:quizId' element={<TakingQuiz />} />
      </Routes>
    </BrowserRouter>
  )
}
