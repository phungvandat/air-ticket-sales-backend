import { Router } from 'express'
import auth from './authentication'
import airports from './airports'
import flights from './flights'
import airTickets from './airTickets'

import { verifyToken } from '../controllers/authController'

const routes = Router()
routes.use(verifyToken)

routes.get('/', (req, res) => res.status(200).json('BAN VE MAY BAY'))
routes.use('/auth', auth)
routes.use('/airports', airports)
routes.use('/flights', flights)
routes.use('/air-tickets', airTickets)

routes.use((err, req, res, next) => {
  if (err.name !== 'HttpError' || !err.errorCode) return next(err)
  res.status(err.errorCode).json({ message: err.message })
})

export default routes