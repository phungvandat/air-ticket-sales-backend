import logger from '../utils/logger'
import Airport from '../models/airport'
import ServerError from '../utils/serverError'

export async function createAirport(req, res) {
  try {
    const { name, address, city, photos } = req.body
    let airport = new Airport({
      name,
      address,
      city,
      photos,
    })

    airport = await airport.save()
    res.status(200).json({
      message: 'Success',
      airport,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getAirport(req, res) {
  try {
    const { airportId } = req.params

    const airport = await Airport.findById(airportId)

    if (!airport) throw new ServerError('FLight is not exists', 400)

    res.status(200).json({
      message: 'Success',
      airport,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getAirports(req, res) {
  try {
    const { skip, limit } = req.query

    const airports = await Airport.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))

    res.status(200).json({
      message: 'Success',
      airports,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}