import logger from '../../utils/logger'
import { CITY_CODES } from '../../utils/constants'
import ServerError from '../../utils/serverError'
import validator from 'validator'

export async function validCreateAirport(req, res, next) {
  try {
    const { name, address, city } = req.body
    if (!name) throw new ServerError('Name airport is required', 400)

    if (!address) throw new ServerError('Address airport is required', 400)

    if (!validator.isIn(city.toString(), Object.values([...CITY_CODES.values()]))) {
      throw new ServerError('City is not exist', 400)
    }
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}