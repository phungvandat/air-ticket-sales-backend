import logger from '../../utils/logger'
import ServerError from '../../utils/serverError'
import { Types } from 'mongoose'
import { fullnameRule, phoneRule, emailRule } from '../../utils/regexp'
import { RANK_TICKET } from '../../utils/constants'

export async function validCreateAirTicket(req, res, next) {
  try {
    const { flightId, listSeats, customerId, fullname,
      phone, email, address, identityCard, birthday } = req.body

    if (!flightId) throw new ServerError('Flight is required', 400)
    if (!Types.ObjectId.isValid(flightId)) throw new ServerError('Incorrect type of flight', 400)

    if (!listSeats || listSeats.length <= 0) throw new ServerError('Seat is required', 400)

    const arrSeatNumber = []
    listSeats.forEach(item => {
      if (item.seatNumber <= 0) throw new ServerError('Incorrect seat number', 400)
      if (Object.values(RANK_TICKET).indexOf(item.ticketRank) < 0) {
        throw new ServerError('Incorrect rank ticket', 400)
      }
      if (arrSeatNumber.includes(item.seatNumber)) throw new ServerError('Duplicate seat number', 400)
      arrSeatNumber.push(item.seatNumber)
    })

    if (customerId && !Types.ObjectId.isValid(customerId)) throw new ServerError('Incorrect type of customer', 400)

    if (fullname) {
      if (fullname.trim() === '') throw new ServerError('Fullname is required', 400)
      if (!fullnameRule.test(fullname)) throw new ServerError('Incorrect fullname', 400)
    }

    if (phone) {
      if (phone.trim() === '') throw new ServerError('Phone is required', 400)
      if (!phoneRule.test(phone)) throw new ServerError('Incorrect phone', 400)
    }

    if (email) {
      if (email.trim() === '') throw new ServerError('Email is required', 400)
      if (!emailRule.test(email)) throw new ServerError('Incorrect email', 400)
    }

    if (identityCard && identityCard.trim() === '') throw new ServerError('Identity Card is required', 400)

    if (address && address.trim() === '') throw new ServerError('Address is required', 400)

    if (birthday && isNaN(new Date(birthday))) throw new ServerError('Birthday is required', 400)

    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validGetAirTicket(req, res, next) {
  try {
    const { airTicketId } = req.params
    if (!Types.ObjectId.isValid(airTicketId)) throw new ServerError('Incorrect type of airTicket', 400)
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validGetAirTickets(req, res, next) {
  try {
    const { skip, limit, customerId, flightId } = req.query

    if (skip && parseInt(skip) < 0) throw new ServerError('Invalid skip', 400)
    if (limit && parseInt(limit) < 0) throw new ServerError('Invalid limit', 400)
    if (customerId && !Types.ObjectId.isValid(flightId)) throw new ServerError('Incorrect type of customer', 400)
    if (flightId && !Types.ObjectId.isValid(flightId)) throw new ServerError('Incorrect type of flight', 400)

    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}