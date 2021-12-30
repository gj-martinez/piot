'use strict'

const debug = require('debug')('piot:web')
const http = require('http')
const path = require('path')
const asyncify = require('express-asyncify')
const express = require('express')
const PiotAgent = require('piot-agent')

const proxy = require('./proxy')
const { pipe } = require('./utils')

const port = process.env.PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const agent = new PiotAgent()

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', proxy)

// Socket.io / WebSockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  pipe(agent, socket)
})

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`fatal error:  ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

server.listen(port, () => {
  console.log(`piot web: server listening on port ${port}`)
  agent.connect()
})
