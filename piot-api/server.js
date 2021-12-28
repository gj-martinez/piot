'use strict'

const http = require('http')
const express = require('express')

const api = require('./api')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

app.use('/api', api)

server.listen(port, () => {
  console.log(`piot server listening on port ${port}`)
})
