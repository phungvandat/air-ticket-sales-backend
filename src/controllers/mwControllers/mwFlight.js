import logger from '../../utils/logger'
import ServerError from '../../utils/serverError'
import { Types } from 'mongoose'

export async function validCreateFlight(req, res, next) {
  try {
    const {
      fromAirportId,
      toAirportId,
      flightTime,
      times,
      numSeatsLuxurious,
      priceLuxurious,
      numSeatsOrdinary,
      priceOrdinary,
    } = req.body

    if (!fromAirportId) throw new ServerError('From airport is required', 400)
    if (!Types.ObjectId.isValid(fromAirportId)) throw new ServerError('Incorrect type of from airport', 400)

    if (!toAirportId) throw new ServerError('To airport is required', 400)
    if (!Types.ObjectId.isValid(toAirportId)) throw new ServerError('Incorrect type of to airport', 400)

    if (fromAirportId === toAirportId) throw new ServerError('From airport and to airport must difference', 400)

    if (!flightTime) throw new ServerError('Flight time is required', 400)

    if (isNaN(new Date(flightTime))) throw new ServerError('Incorrect type of flight time', 400)

    if (!times) throw new ServerError('Times is required', 400)

    if (times < 0) throw new ServerError('Incorrect times', 400)

    if (!numSeatsLuxurious) throw new ServerError('Seats luxurious is required', 400)

    if (!numSeatsOrdinary) throw new ServerError('Seats ordinary is required', 400)

    if (numSeatsLuxurious < 0) throw new ServerError('Seats is more than 0', 400)

    if (numSeatsOrdinary < 0) throw new ServerError('Seats is more than 0', 400)

    if (!priceLuxurious) throw new ServerError('Price luxurious is required', 400)

    if (!priceOrdinary) throw new ServerError('Price ordinary is required', 400)

    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validGetFlight(req, res, next) {
  try {
    const { flightId } = req.params
    if (!Types.ObjectId.isValid(flightId)) throw new ServerError('Incorrect type of flight', 400)
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validGetFlights(req, res, next) {
  try {
    const { skip, limit } = req.query

    if (skip && parseInt(skip)) throw new ServerError('Invalid skip', 400)
    if (limit && parseInt(limit)) throw new ServerError('Invalid limit', 400)

    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validUpdateFlight(req, res, next) {
  try {
    const {
      fromAirportId,
      toAirportId,
      flightTime,
      times,
      numSeatsLuxurious,
      priceLuxurious,
      numSeatsOrdinary,
      priceOrdinary,
    } = req.body
    if (!fromAirportId) throw new ServerError('From airport is required', 400)
    if (!toAirportId) throw new ServerError('From airport is required', 400)
    if (!flightTime) throw new ServerError('Flight time is required', 400)
    if (!times) throw new ServerError('Times is required', 400)
    if (!numSeatsLuxurious) throw new ServerError('Number seats luxurious is required', 400)
    if (!priceLuxurious) throw new ServerError('Price luxurious is required', 400)
    if (!numSeatsOrdinary) throw new ServerError('Number seats ordinary is required', 400)
    if (!priceOrdinary) throw new ServerError('Price ordinary is required', 400)
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}