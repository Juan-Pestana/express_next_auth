require('dotenv').config()

require('./config/db')

const bodyParser = require('body-parser')
const routes = require('./routes')
const cors = require('cors')

const express = require('express')

//crear servidor

const app = express()

require('./auth/auth')

//habilitar CORS
app.use(cors())

//Habilitar express.json

app.use(express.json({ extended: true }))

app.use(routes)

//PUETO DE LA APP
const PORT = process.env.PORT || 4000

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`)
})
