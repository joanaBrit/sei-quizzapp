
import axios from 'axios'
import { useEffect } from 'react'


export default function TakingQuiz(){

  useEffect(() => {
    async function getQuizSingle(){
      // const { data } = await axios.get(``)
    }
    getQuizSingle()
  }, [])

  return <h1>Hello</h1>
}
