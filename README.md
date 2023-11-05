## General-Assembly Project 3

# SEI QUIZ

For the third project,  I explored the world of full-stack development for the first time. Our team collaborated to create the 'SEI Quiz App', a web application designed for quiz enthusiasts. The application uses Express API and MongoDB for the backend, while React for the frontend. To participate, users need to create an account, and for those feeling inspired, you can even contribute by creating, updating, or deleting questions in your chosen category. The project is now live online, providing public access to a world of quizzing fun and learning.  

#### Timeframe

The project took one and a half weeks to complete and was a team of three. I collaborated with Alessio and Nathalie.


## Want to Test Your Coding Knowledge? 

[SEI Quiz App](https://sei-quizzapp-f2eca0ac6f23.herokuapp.com/)


## Technologies Used

### Development Tools:

#### Excalidraw

* Used for creating wireframes.

#### Figma

* Used for creating design prototypes.

#### Trello

* Task organisation and tracking.

#### Github

* Created a repository.
* Monitored team collaboration through commits.

#### Insomnia 

* Used for testing GET, POST, PUT and DELETE methods and API manipulation.

#### Terminal

* Executed commands for package.json creation, server start, and seed running.
* Installed backend dependencies such as express, dotenv, bcryptjs, jsonwebtoken, mongoose.
* Installed React dependencies like Sass, React Bootstrap, React-router-dom, React-responsive-carousel, Axios.


### Back End:

#### Node.js

* Server-side development for building RESTful APIs.
* Asynchronous management using callbacks, promises, and async/await.
* Express for routing, middleware management, and request handling.
* Database connectivity with MongoDB for storage and retrieval.
* Authentication, required for users to create, update or delete a quiz.
* API development, creating RESTful APIs.
* Error handling.

#### MongoDB

* Database creation and data insertion.
* MongoDB shell (mongosh) for testing queries.
* Mongoose for creating Schemas.

#### Heroku

* Used for deploying, running and hosting the application in the cloud.


### Front End:

#### React

* Importing and exporting files.
* React-router-dom for routing.
* Axios for fetching data from the backend.
* Utilised useEffect and useState Hooks. 
* Used useParams for reading URL parameters.

#### Sass

* Utilised different Sass files for styling separation.
* Created variables for consistent styling across the pages.
* Styled several elements.

#### React-Bootstrap

* Styled text and buttons.
* Displayed images in a carousel with auto-running intervals.


## Brief

* Building a full-stack application.
* Creating an Express API to serve data from a MongoDB database.
* Developing a separate frontend using React to consume the API.
* Build a complete app with CRUD (Create, Read, Update, Delete) functionality for at least a couple of models.
* Implementation of well-thought-out user stories and wireframes.
* Ensuring the project is deployed online for public accessibility.

#### Necessary Deliverables:

* A fully functional app hosted on the internet.
* A link to our hosted app in the URL section of our Github repository.
* A Git repository hosted on Github, with a link to our hosted project and frequent commits.


## Planing

In the initial phase of our project, we embarked on a research journey to determine the type of application we wanted to create. After careful consideration, we collectively decided to develop a quiz app.

### Sketches and Wireframes:

To visually see what our app would be, we utilised Excalidraw. During this phase, one team member took on the role of sketching out ideas while we engaged in discussions about the app's page layout, the number of routes we wanted to create, and some essential details for each page. This collaborative process allowed us to have a clear vision of what we were building, making the development process easier.

![Excalidraw plan](<readmeimg/plan.png>)

![Excalidraw plan](<readmeimg/plan2.png>)

### Project Management with Trello:

For project management and task allocation, we used Trello. We organised our tasks, differentiating them by colour. We determined task assignments based on a combination of skills and personal preferences. This approach helped us easily identify individual responsibilities, track progress, and know what was left to complete. As tasks were finished, we updated their statuses on Trello to maintain a comprehensive overview of our project's progress.

![Trello](<readmeimg/trello.png>)

### Prototyping with Figma:

As for the design aspect, I took on the role of initiating the design process. I created prototypes in Figma, incorporating various fonts and page styles. These prototypes served as a visual foundation for our team to evaluate and decide upon the preferred design direction.

![Figma](<readmeimg/figma.png>)


## Project Breakdown


### Day 1 - Project Planning and Initialization:

* On the first day, our team began by choosing the app from the ideas the night before. 
* We planned the project together, by drawing wireframes, writing and distributing tasks on Trello. 
* We created the project repository and initiated the setup by installing necessary packages and performing basic configurations.

### Day 2 - Backend Development: 

* Backend development started with each team member handling specific tasks.
* I focused on creating the register and login forms. 
* I talked with my colleague responsible for data management, to propose some adjustments, like limiting the maximum username length to 15 characters for styling purposes. I just didn’t think it would be easier to manage a design level of a username with 30 letters. Additionally, with my colleagues permission, I implement a password confirmation field for adding security.

```javascript

// * SCHEMA 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, maxlength: 15 },
  email: { type: String, requried: true, unique: true },
  password: { type: String, required: true, minlength: 4 }
})

```

* The backend setup involved running essential commands to start the server and creating controllers for registration and login, implementing async/await and error handling.
* I used JSON Web Tokens (jsonwebtoken) for user authentication.
* Used a password generated to create the SECRET on .env file, to be able to complete my login function.
* The user model was created using Mongoose Schema, incorporating virtual fields and pre-validation, pre-save logic.
* Routes for registration and login were established and tested in Insomnia.

![User](<readmeimg/user.png>)

### Day 3 -  Frontend Setup and Data Fetching:

* On the third day, I initiated frontend development. Started by running two terminals, one for each part, and installed what I thought necessary in React. 
* I began by ensuring the frontend index had all the required imports. 
* Set up navigation routes using react-router-dom and fetched quiz data with Axios.
* Created JSX routes for the pages I would work on, the home (login), registration, and landing pages. 
* Imported the {BrowserRouter, Route, Routes} from react-router-dom. 
* The landing page was designed to display quiz categories as a carousel from React Bootstrap. 
* Implemented a button for adding questions.

### Day 4 - Frontend Development:

* I started working on the frontend's register page. 
* Created form fields and functions to handle user registration. 
* Established a connection between the registration form and frontend.
* Implemented State management for error handling and data.
* Developed the register form's JSX structure and event handlers.

### Day 5 - Debugging and Styling:

* This day began with debugging some issues encountered in the previous day's work, the JSX in the form Page was not working in the way that I wanted. 
* Started by exploring and searching for what was wrong. I could just make something simple but also wanted to know why? In the end the issue turned out to be a simple spelling mistake.
* Page, somehow was not. I looked through my notes, watched some recordings to try to figure out what was causing my error, and just realised it was just a simple spelling mistake. 
* Started creating Sass pages and introduced styling variables to ensure a consistent design across the application, in this way my colleagues could easily do their own styling.  


```javascript

  return (
    <section>
      <h2 className="subtitle fs-2 mb-4">{title}</h2>
      <Container>
        <Row>
          {fields.length > 0 ?
            <Col as="form" xs={{ span: 8 }} md={{ span: 6 }} onSubmit={handleSubmit} autoComplete='off'>
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
              {errors && <p className='text-warning bold text mt-4'>{errors}</p>}
              <button type="submit" className='btn btn-sm col-10 d-block m-auto mt-4'>{title}</button>
            </Col>
            :
            'Form Error'
          }
        </Row>
      </Container>
    </section>
  )
}

```

### Day 6 - Error Handling and Styling:

* Addressed error handling and implemented better error visualisation by creating an error file on the backend. 
* Focused on making error messages more user-friendly and informative. But I had some difficulties accessing the error file from the backend to give a specific and understanding response to the user. 
* Added styling enhancements to the register and login pages, implemented Bootstrap components and new fonts.
* Completed styling variables and shared them with the team. 


```javascript

// * Custom classes

class CustomError extends Error {
  constructor(message, details) {
    super(message)
    this.details = details
  }
}


export class UnprocessableEntity extends CustomError {
  constructor(message, details) {
    super(message, details)
    this.name - 'UnprocessableEntity'
    this.status = 422
  }
}


export class Unauthorized extends CustomError {
  constructor(message, details) {
    super(message, details)
    this.name = 'Unauthorized'
    this.status = 401
    this.errors = 'Unauthorized'
  }
}


export class NotFound extends CustomError {
  constructor(message, details) {
    super(message, details)
    this.name = 'NotFound'
    this.status = 404
  }
}

```
```javascript

export const sendErrors = (error, res) => {

  let { message, name, status, details, errors } = error

  // Set fallbacks
  status = status || 422
  details = errors || details || message || name

  console.log('-------------------------')
  console.log('-------------------------')
  console.log('🧨🧨 Errors 🧨🧨')
  console.log('-------------------------')
  console.log('⛔ Name:', status, name)
  console.log('⛔ Message:', message)
  console.log('⛔ Details:', details)
  console.log('-------------------------')
  console.log('-------------------------')

  return res.status(status).json({ errors: details })
}

```

In this picture you can see an error message and a button alignment issue “part day 7”.

![Error Handling](<readmeimg/error Handling.png>)

### Day 7 - Styling and Layout Challenges:

* Addressed styling issues, particularly with button alignment on the Home/Login page. I had initially structured the JSX in the Form Page as a form, creating separate buttons for each page (Register and Login). However, for the Home page, both Register and Login buttons were needed, and adding an extra button to the Form Page would result in it appearing in both pages, I needed to have this button in the Ho/Login page. The problem was solved by introducing a new div and a new CSS class to manipulate button positioning.
* Continued with additional styling improvements.

### Day 8 - Utility Functions:

* Created a utilities folder to implement authentication and common utility functions.
* Developed utility functions for field state initialization, value preparation, and form field handling.

### Day 9 - Carousel Integration:

* Searched and experimented with React Bootstrap to integrate a carousel.
* Initially, I encountered challenges when attempting to set up the carousel. I’ve tried several things and nothing was working. To overcome these challenges, I did further research to identify potential issues and solutions. I reviewed documentation, watched tutorials, and examined code examples to gain a better understanding of the carousel's behaviour and configuration. After that, I successfully implemented the carousel component and began experimenting with various settings and options to ensure it behaved as expected. 
* I also customised the default carousel arrows to align with our project's overall visual style.
* I needed to search for more suitable images that aligned better with our project's theme. Additionally, I incorporated the assets folder that my colleague had created in the backend on the client side.


```javascript

  return (
    <section>
      <main>
        <section className='wrap-carousel'>
          <h1 className="title text-center text-uppercase mb-5">Sei Quiz App</h1>
          <Carousel
            interval={1000}
            nextIcon={<span aria-hidden="true" className="carousel-control-next-icon change" />}
            prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon change" />}
          >
            {quizzes.map(({ title, icon, _id }, i) =>
              <Carousel.Item key={i}>
                <div className='display-category' >
                  <Carousel.Caption>
                    <h3>{title}</h3>
                  </Carousel.Caption>
                  <Link to={`/quizzes/${_id}`}>
                    <img alt={title} src={icon} />
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
      </main>
    </section>
  )
}

```

### Day 10 - Presentation and Deployment:

* On presentation day, we completed the remaining tasks and I assisted one of my team members with styling challenges. 
* We were waiting for an element of the team who was travelling that day to push her work for us to start the deployment, but it was difficult since she was having connectivity issues. We delayed the deployment and the presentation leaving us for last. When we received the work we had merge issues and some parts were modified, we lost the styling fixed in the morning as well. 
* We presented the project despite these challenges, acknowledged and explained the situation to the tutor.


## Final Product

### Login Page:

![Login Page](<readmeimg/login.png>)

### Register Page:

![Register Page](<readmeimg/register.png>)

### Landing Page:

![Landing Page](<readmeimg/langing.png>)


### Wins

1. **Successful Collaboration:** I effectively collaborated with my team members, contributing your skills and expertise to various aspects of the project.

2. **Backend Development:** The work on the backend, including the creation of registration and login forms, user schema, and implementing async/await and error handling.


3. **User Improvements:** My proposal to limit the maximum username length, add password confirmation, and implement a minimum password length reflected the commitment to create an user-friendly application.

4. **Problem Solving:** The ability to address challenges, such as the alignment of buttons and carousel integration, demonstrated problem-solving skills and determination to overcome obstacles.


### Challenges

1. **Frontend Review:** I faced some challenges when transitioning to the front-end development aspect of the project. To ensure I was on the right track, I needed to review some of the earlier steps.

2. **Error Handling Integration:** Initially, I began implementing error handling in the backend. However, when it came to communicating meaningful error messages to users on the front end. I found it challenging to ascertain the ideal approach. I ended up using a series of if statements in the front end, which I realised was not the most elegant or efficient solution.

3. **Design Feedback:** While I was primarily responsible for starting the styling, I wished for more active involvement and feedback from my team regarding design decisions. The lack of detailed feedback sometimes left me uncertain about their preferences or suggestions for improvement.

4. **React Bootstrap Carousel:** Working with React Bootstrap Carousel was very interesting but also challenging. It took me some time to figure out how to effectively handle and display the data fetched for the carousel. It was a very interesting process here, and I would like to explore this more in another project.


### Key Learnings

Through the process of building the backend of our web application, I gained an understanding of Node.js and Express. I became more proficient in handling asynchronous operations using callbacks, promises, and async/await. This experience significantly improved my server-side development skills.

I gained insights into the importance of user-centric design. The decision to limit username length, implement password confirmation, and set password length requirements highlighted the significance of creating an intuitive and secure user experience.

The use of project management tools like Trello for task distribution and organisation improved our project management skills. We learned how to allocate responsibilities efficiently and track progress effectively.

Experimenting with styling and customising components enhanced my UI/UX design skills. 

Regular use of version control tools like Git and GitHub helped me become more comfortable with managing code repositories, creating branches, and resolving merge conflicts.


### Bugs

There are a few things to fix due to merge conflicts, like styling some pages. 


### Future Improvements

* One of the first areas I would focus on for improvement is the styling of the application. During the development process, we encountered some late merge conflicts that led to styling discrepancies. Given more time, I would refine and unify the styling to ensure a smooth and polished user experience.
* While I respect my colleagues' contributions to the project, I see an opportunity for improvement, specifically the question page. I found it confusing, and I wanted to make it more understandable. This could involve improving the layout or just reorganising the content to user comprehension.
