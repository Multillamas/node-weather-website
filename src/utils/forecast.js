const request = require('postman-request')
const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=80100db9587a10e586fc00194b33e59d&query=' + longitude + ',' + latitude

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined,
        'It is currently ' + body.current.weather_descriptions[0] + ' Temperature is ' + body.current.temperature + '. And feels like ' + body.current.feelslike + ' degrees out.'
      )
    }
  })
}

module.exports = forecast
