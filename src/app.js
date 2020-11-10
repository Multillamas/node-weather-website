const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // Aqui estamos inicializando nuestra applicacion. Es decir, app es una application.
const port = process.env.PORT || 3000// To extract the value of the port that Heroku provides at the os level enviroment

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlers engine and view location
app.set('view engine', 'hbs') // This app.set tells express what template engine we have used. it takes a key and a value as arguments
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup sattic directory to serve
app.use(express.static(publicDirectoryPath)) // app.use way to customize the server. Static on the other hand, configures in some way the application

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Lulu M'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Lulu M'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is the message of help',
    name: 'Lulu M'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please, provide an address'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Lulu M',
    errorMessage: 'Help article not found'
  })
})

// This 404 errror a. needs to come at last, 2. the * means anything that it has not been set up above
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Lulu M',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})

// NOTAS DEL CURSO:

// absolute paths __filename
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// Esto de abajo fue remplazado por app.use. Porque express toma automaticamente el app.use, por lo tanto esta que era nuestra pagina de entrada, express la salta y toma en vez el index.html
// app.get will tell us what the server should give us when we call look for a resource on an specific url, por ejemplo, html? JSON?, etc
// app.get('', (req, res) => { // Toma dos argumentos url y una funcion que especifica que debemos de mandar de regreso al cliente
//   res.send('<h1>Weather</h1>')
// })
// app.get('/help', (req, res) => {
//   res.send('Help page')
// })

// app.get('/about', (req, res) => {
//   res.send('<h1>About</h1>')
// })
