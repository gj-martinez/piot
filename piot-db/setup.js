'use strict'

const debug = require('debug')('piot:db:setup')
const inquirer = require('inquirer')
const db = require('./')

const prompt = inquirer.createPromptModule()

const args = process.argv.slice()

async function setup () {
  if(!args.includes( '-y') && !args.includes( '--yes' )){
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database? are you sure?'
      }
    ])
    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }
  const config = {
    database: process.env.DB_NAME || 'piot',
    username: process.env.DB_USER || 'superadmin',
    password: process.env.DB_PASS || 'admin123',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
