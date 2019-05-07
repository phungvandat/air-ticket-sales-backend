import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => res.status(200).json('BAN VE MAY BAY'))

routes.use((err, req, res, next) => {
  if (err.name !== 'HttpError' || !err.errorCode) return next(err)
  res.status(err.errorCode).json({ message: err.message })
})

export default routes