import logger from '../../utils/logger'
import { CITY_CODES } from '../../utils/constants'
import ServerError from '../../utils/serverError'
import validator from 'validator'
import { Types } from 'mongoose'

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

export async function validGetAirport(req, res, next) {
  try {
    const { airportId } = req.params
    if (!Types.ObjectId.isValid(airportId)) throw new ServerError('Incorrect type of airport', 400)
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validGetAirports(req, res, next) {
  try {
    const { skip, limit } = req.query

    if (skip && parseInt(skip) < 0) throw new ServerError('Invalid skip', 400)
    if (limit && parseInt(limit) < 0) throw new ServerError('Invalid limit', 400)

    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validUpdateAirport(req, res, next) {
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