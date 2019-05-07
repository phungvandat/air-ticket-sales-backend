import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import http from 'http'

import logger from './utils/logger'
import config from './config'

const app = express()

app.use(morgan('dev'))

app.use((req, res, next) => {
  const cors = [config.CORS]
  if (cors.includes(req.headers.origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, x-access-token')
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes').default)

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('open', () => {
  logger.info('DB connected')
})

db.on('error', err => logger.error(err))

const server = http.Server(app)

server.listen(config.PORT, () => logger.info(`> Ready on port ${config.PORT}`))

process.on('uncaughtException', err => logger.error('uncaughtException: ' + err))
process.on('unhandledRejection', err => logger.error('unhandledRejection: ' + err))