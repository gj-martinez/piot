'use strict'

const debug = require('debug')('piot:web')
const http = require('http')
const path = require('path')
const express = require('express')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

function handleFatalError (err) {
  console.error(`fatal error:  ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`piot web: server listening on port ${port}`)
})