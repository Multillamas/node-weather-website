const request = require('postman-request')

const geocode = (address, callaback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVtbTIwMjAiLCJhIjoiY2tmcjBhMjR3MDlpNjJxbzhwN2Y3dWp1ZSJ9.B3GRX-ItRKe7mRbBBPO89g&limit=1'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callaback('Unable to connect to weatherlocation services.', undefined)
    } else if (body.features.length === 0) { // This is an error handler for low'level errors
      callaback('Unable to find location. Try another search', undefined)
    } else {
      callaback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
