const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('../utils/geocode');
const weather = require('../utils/weather');

const app = express();
const port = process.env.PORT || 3000
// Express Config Paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebards config
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Static serve directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thanos Mosh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Thanos Mosh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help page Message',
        title: 'Help',
        name: 'Thanos Mosh'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({ error })
        } 
        weather(latitude, longitude, (error, {summary, temperature, rainProb}) => {
    
            if (error) {
               return res.send({ error })
            }
            res.send({
                forecast: temperature,
                location: location,
                address: req.query.address
            })
        })
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Thanos Mosh',
        errorMessage: 'Help Article not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Thanos mosh',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})