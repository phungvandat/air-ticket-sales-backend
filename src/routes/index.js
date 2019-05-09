import { Router } from 'express'
import auth from './authentication'
import { verifyToken } from '../controllers/authController'

const routes = Router()
routes.use(verifyToken)

routes.get('/', (req, res) => res.status(200).json('BAN VE MAY BAY'))
routes.use('/auth', auth)

routes.use((err, req, res, next) => {
  if (err.name !== 'HttpError' || !err.errorCode) return next(err)
  res.status(err.errorCode).json({ message: err.message })
})

export default routes