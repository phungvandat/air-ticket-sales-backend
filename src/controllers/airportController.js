import logger from '../utils/logger'
import Airport from '../models/airport'
import ServerError from '../utils/serverError'

export async function createAirport(req, res) {
  try {
    const { name, address, city, photo } = req.body
    let airport = new Airport({
      name,
      address,
      city,
      photo,
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

    const airport = await Airport.findOne({
      _id: airportId,
      flag: { $ne: -1 },
    })

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

    const airports = await Airport.find({ flag: { $ne: -1 } })
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

export async function updateAirport(req, res) {
  try {
    const { airportId } = req.params
    const { name, city, photo, address } = req.body

    let airport = await Airport.findById(airportId)

    if (!airport) throw new ServerError('Airport is not exists', 400)

    const objUpdate = {}
    if (name) objUpdate.name = name
    if (city) objUpdate.city = city
    if (photo) objUpdate.photo = photo
    if (address) objUpdate.address = address

    airport.set(objUpdate)

    airport = await airport.save()
    res.status(200).json({ message: 'Success', airport })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function deleteAirport(req, res) {
  try {
    const { airportId } = req.params

    const airport = await Airport.findById(airportId)

    if (!airport) throw new ServerError('Airport is not exists', 400)

    await Airport.findByIdAndUpdate(airportId, { flag: -1 })
    res.status(200).json({ message: 'Success' })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}