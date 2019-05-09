import logger from '../utils/logger'
import Airport from '../models/airport'

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