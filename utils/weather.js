const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/578b564a1514df1975e855cc178819a4/${latitude},${longitude}?units=si&lang=el`
  
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to services')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainProb: body.currently.precipProbability
            })
        } 
    })

}

module.exports = weather