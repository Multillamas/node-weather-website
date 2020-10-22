
const weatherForm = document.querySelector('form') // This is a js representation that allows to manipulate elements on a webpage.
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault() // The only thing this function  does is to prevent the browser to be refreshing everytime that we click on submit
  const location = searchInput.value
  messageOne.textContent = 'Loding...'
  messageTwo.textContent = ''
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})

// NOTEs FROM THE COURSE:

console.log('client side javascript is loading') // The goal of this page is to fetch the forecast information from the http into our clien-side js
// The api fetch is not a js nor is accessible by node. It is provided api by the browser
/* HOW THE API WORKS
fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
}) */
