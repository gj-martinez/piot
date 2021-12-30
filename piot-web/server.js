'use strict'

const debug = require('debug')('piot:web')
const http = require('http')
const path = require('path')
const express = require('express')

const port = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))


// Socket.io / WebSockets
io.on('connect', socket => {
  debug(`Connected ${socket.id}`)

  socket.on('agent/message', payload => {
    console.log(payload)
  })

  setInterval(() => {
    socket.emit('agent/message', { agent: 'xxx-yyy' })
  }, 2000)
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
})