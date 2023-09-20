import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
import Carousel from 'react-bootstrap/Carousel'

import axios from 'axios'



export default function Landing() {
  const [quizzes, setQuizzes] = useState([])
  const username = localStorage.getItem('username')
  useEffect(() => {
    async function getQuizzesData() {
      try {
        const { data } = await axios('/api/quizzes')
        setQuizzes(data)
      } catch (error) {
        console.log(error)
      }
    }
    getQuizzesData()
  }, [])


  // function TheCarousel({ title, icon }) {
  //   const [hoverIdx, SetHoverIdx] = useState(null)

  //   const handleMouseEnter = (index) => {
  //     SetHoverIdx(index)
  //   }

  //   const handleMouseLeave = () => {
  //     SetHoverIdx(null)
  //   }




  return (
    <section>
      <nav>
        <span className='username'>{username}</span>
      </nav>

      <main>
        <section className='wrap-carousel'>
          <h1 className="title text-center text-uppercase mb-5">Sei Quiz App</h1>
          <Carousel
            // data-bs-theme="dark"
            // {/*  interval={1000}*/}
            nextIcon={<span aria-hidden="true" className="carousel-control-next-icon change" />}
            prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon change" />}
          >
            {quizzes.map(({ title, icon, _id }, i) =>

              <Carousel.Item key={i}>



                <div className='display-category' >
                  <Carousel.Caption>
                    <h3>{title}</h3>
                  </Carousel.Caption>
                  <Link to={`/quizzes/${_id}`}> {/* Just an idea on how this should look like, we can change the link or anything to other things, but i had to use {title, _id } to make things easier */}
                    <img alt={title} src={icon || 'Image not Found'} />
                  </Link>
                </div>

                <div className='add-question'>
                  <Link to={`/quizzes/${_id}/questions`} className='link-btn'>
                    <div >
                      <Carousel.Caption>
                        <button type='button' className='btn btn-sm col-3 d-block m-auto mt-2'>Add Question</button>
                      </Carousel.Caption>
                    </div>
                  </Link>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
        </section>
      </main >

    </section >
  )
}


// ReactDOM.render(<TheCarousel />, document.querySelector('.the-carousel'))




// return (
//   <section>
//     <nav>
//       <span className='username'>{username}</span>
//     </nav>
//     <main>
//       <section >
//         <h1 className="title text-center text-uppercase mb-5">Sei Quiz App</h1>
//         {/* <Carousel> */}
//         {quizzes.map(({ title, icon, _id }, i) =>
//           <div key={i}>

//             <div className='display-category'>
//               <h3>{title}</h3>
//               <Link to={`/quizzes/${_id}`}> {/* Just an idea on how this should look like, we can change the link or anything to other things, but i had to use {title, _id } to make things easier */}
//                 <img alt={title} src={icon || 'Image not Found'} />
//               </Link>
//             </div>
//             <div className='add-question'>
//               <Link to={`/quizzes/${_id}/questions`} className='link-btn'>
//                 <div >
//                   <button type='button' className='btn btn-sm col-3 d-block m-auto mt-2'>Add Question</button>
//                 </div>
//               </Link>
//             </div>
//           </div>)}
//         {/* </Carousel> */}
//       </section>
//     </main >
//   </section >
// )
// }
