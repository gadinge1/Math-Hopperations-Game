// Buttons and Elements
const homeButton = document.getElementById('home-button')
const startButton = document.getElementById('start-button')
const nextButton = document.getElementById('next-button')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// Shuffle function. Questions will shuffle every time it refreshes or restarts or when Next is clicked.
let shuffledQuestions, currentQuestionIndex

// Event listeners for Start, Next and Home buttons 
homeButton.addEventListener('click', goHome) // when clicked it goes to home page.
startButton.addEventListener('click', startGame) // when clicked it goes to the first question.
nextButton.addEventListener('click', () => {  // when clicked it goes to the next question.
  currentQuestionIndex++
  setNextQuestion()
})
// Function to go to home page
function goHome() {
  homeButton.classList.add('hide') // this function goes back to home page when clicked.
  window.document.location='welcome.html' // path to the welcome page.
}
// Function for the start game.
function startGame() { 
    startButton.classList.add('hide')// this function hides the start button when it's clicked.
    shuffledQuestions = questions.sort(() => Math.random() - .5) // shuffles random questions.
    currentQuestionIndex = 0 // setting it to 0 because it starts to the first question
    questionContainerElement.classList.remove('hide') // hides the question container.
    setNextQuestion() // calling the next question.
  }
// Function for the next question.  
  function setNextQuestion() {
    resetState() // reset the question to its default and set a new question.
    showQuestion(shuffledQuestions[currentQuestionIndex]) // This shows the next question at the current index.
  }
// Function for show question.
  function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => { // creates the answer for each.
      const button = document.createElement('button')
      button.innerText = answer.text
      button.classList.add('btn')
      if (answer.correct) {
        button.dataset.correct = answer.correct // Setting dataset for only correct answer.
      }
      button.addEventListener('click', selectAnswer) // shows answers when button answer is clicked.
      answerButtonsElement.appendChild(button)
    })
  }
// Reset function which shows the answers and hiding the next correct and wrong answers.
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide') // after clicking the answer the next question will show and hide the next button.
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
  }
// Select answer function
  function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct) // shows if the answer is correct.
    Array.from(answerButtonsElement.children).forEach(button => {  // an array for forEach loop.
      setStatusClass(button, button.dataset.correct) // correct answer status.
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide') // next button is hidden when clicked.
    } else {
      startButton.innerText = 'Restart' // Allows the user to restart.
      startButton.classList.remove('hide') // Start button disappears when the start button is clicked.
    }
  }
  // Set status class function. Shows correct or wrong.
  function setStatusClass(element, correct) { // it clears the status when question restarts or refreshes. 
    clearStatusClass(element)
    if (correct) {
      element.classList.add('correct') // correct class
    } else {
      element.classList.add('wrong') // wwrong class
    }
  }
  // Function to show the status for correct and wrong button
  function clearStatusClass(element) {
    element.classList.remove('correct') // hides the correct status.
    element.classList.remove('wrong')  // hides the wrong status. 
  }
  // List of questions and answers. True is for correct answer and false is for wrong answers.
  const questions = [
    {
      question: 'If the cost of a bat and a baseball combined is $1.10 and the bat costs $1.00 more than the ball, how much is the ball ?',
      answers: [
        { text: '$0.05', correct: true },
        { text: '$1.00', correct: false },
        { text: '$0.50', correct: false},
        { text: '$0.10', correct: false},
      ] // Subtract $1.00 from $1.10 and then divide that answer, $0.10 by 2, to get your final answer, $0.05.
    },
    {
        question: 'Add 8.563 and 4.8292.',
        answers: [
          { text: '12.3922', correct: false},
          { text: '13.3922', correct: true},
          { text: '15.2932', correct: false},
          { text: '9.2922', correct: false},
        ] // Add a 0 to the end of 8.563 and then add like you normally would.
      },
      {
      question: 'How many feet are in a mile ?',
        answers: [
          { text: '5,500', correct: false},
          { text: '8,300', correct: false},
          { text: '4,680', correct: false},
          { text: '5,280', correct: true},
        ] 
      },
      {
        question: 'What is 1.92 divided by 3 ?',
        answers: [
          { text: '1.64', correct: false},
          { text: '0.64', correct: true},
          { text: '2.64', correct: false},
          { text: '3.64', correct: false},
        ]
      }, // You need to remove the decimal from 1.92 and act like it isn't there. Once you've divided 192 by 3 to get 64, you can put the decimal place back where it belongs and get your final answer of 0.64.
    {
        question: 'Tommy has 10 oranges. He gives 6 oranges to Julie. How many oranges does Tommy have now ?',
        answers: [
          { text: '5', correct: false},
          { text: '8', correct: false},
          { text: '4', correct: true}, // 10-6=4 Tommy has 4 oranges.
          { text: '6', correct: false},
        ]
      },
]