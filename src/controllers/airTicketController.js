import logger from '../utils/logger'
import ServerError from '../utils/serverError'
import Customer from '../models/customer'
import Flight from '../models/flight'
import AirTicket from '../models/airTicket'

export async function createAirTicket(req, res) {
  try {
    const { flightId, listSeats } = req.body
    let { customerId } = req.body
    // Info customer
    const { fullname, phone, email, address, identityCard, birthday } = req.body

    if (!customerId) {
      let customer = new Customer({
        fullname,
        phone,
        email,
        address,
        identityCard,
        birthday: new Date(birthday),
      })

      customer = await customer.save()
      customerId = customer._id
    }

    const flight = await Flight.findById(flightId)
    if (!flight) throw new ServerError('Flight is not exists', 400)

    const arrPromise = []
    listSeats.forEach(item => {
      arrPromise.push(AirTicket.findOne({
        flight: flightId,
        seatNumber: item.seatNumber,
      }))
    })

    const arrResultPromise = await Promise.all(arrPromise)

    for (let i = 0; i < arrResultPromise.length; i++) {
      if (arrResultPromise[i]) {
        throw new ServerError(`seat number ${listSeats[i].seatNumber} has been placed`)
      }
    }


    const arrAirTicket = listSeats.map(item => {
      return new AirTicket({
        flight: flightId,
        seatNumber: item.seatNumber,
        customer: customerId,
        ticketRank: item.ticketRank,
        price: item.price,
      })
    })

    await AirTicket.insertMany(arrAirTicket)

    res.status(200).json({
      message: 'Success',
      airTickets: arrAirTicket,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}


export async function getAirTicket(req, res) {
  try {
    const { airTicketId } = req.params

    const airTicket = await AirTicket.findById(airTicketId)

    if (!airTicket) throw new ServerError('Air ticket is not exists', 400)
    res.status(200).json({
      message: 'Success',
      airTicket,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getAirTickets(req, res) {
  try {
    const { skip, limit, customerId, flightId, ticketRank } = req.query

    const objQuery = {}

    if (flightId) objQuery.flight = flightId
    if (customerId) objQuery.customer = customerId
    if (ticketRank) objQuery.ticketRank = ticketRank

    const airTickets = await AirTicket.find(objQuery)
      .limit(parseInt(limit))
      .skip(parseInt(skip))

    res.status(200).json({
      message: 'Success',
      airTickets,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}