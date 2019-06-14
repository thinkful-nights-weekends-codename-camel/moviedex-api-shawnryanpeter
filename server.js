require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIES = require('./movie-data-small.json')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    console.log(authToken)
    console.log(apiToken)
    if(!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({error: 'Unauthorized request'})
    }
    next()
})

app.get('/movies', function handleGetMovies(req, res) {
    let response = MOVIES.movies;

    /*if(req.query.rating){
        response = response.filter(movie => 
            movie.rating.toLowercase().includes(req.rating.genre))
    }*/

    /*if(req.query.country){
        response = response.filter(movie => 
            movie.country.toLowercase().includes(req.query.country))
    }*/

    if(req.query.genre){
        response = response.filter(movie => 
            movie.genre.toLowercase().includes(req.query.genre.toLowerCase()))
    }
})


const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})