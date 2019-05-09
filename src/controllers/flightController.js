import logger from '../utils/logger'
import Flight from '../models/flight'
import Airport from '../models/airport'
import ServerError from '../utils/serverError'

export async function createFlight(req, res) {
  try {
    const { fromAirportId, toAirportId, flightTime, times, numSeats } = req.body

    const arrResultPromises = await Promise.all([
      Airport.findById(fromAirportId),
      Airport.findById(toAirportId),
    ])

    if (!arrResultPromises[0]) throw new ServerError('From airport not exists', 400)
    if (!arrResultPromises[1]) throw new ServerError('To airport not exists', 400)

    let flight = new Flight({
      fromAirport: fromAirportId,
      toAirport: toAirportId,
      flightTime: new Date(flightTime),
      times,
      numSeats,
    })

    flight = await flight.save()
    res.status(200).json({
      message: 'Success',
      flight,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getFlight(req, res) {
  try {
    const { flightId } = req.params

    const flight = await Flight.findById(flightId)
      .populate('fromAirport')
      .populate('toAirport')

    if (!flight) throw new ServerError('FLight is not exists', 400)

    res.status(200).json({
      message: 'Success',
      flight,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getFlights(req, res) {
  try {
    const { skip, limit } = req.query

    const flights = await Flight.find()
      .populate('fromAirport')
      .populate('toAirport')
      .skip(parseInt(skip))
      .limit(parseInt(limit))

    res.status(200).json({
      message: 'Success',
      flights,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}