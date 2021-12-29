'use strict'

const debug = require('debug')('piot:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'piot',
    username: process.env.DB_USER || 'superadmin',
    password: process.env.DB_PASS || 'admin123',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  },
  auth: {
    secret: process.env.SECRET || 'plataformaiot',
    algorithms: ['HS256']
  }
}
