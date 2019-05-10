import logger from '../../utils/logger'
import ServerError from '../../utils/serverError'
import { Types } from 'mongoose'
import { fullnameRule, phoneRule, emailRule } from '../../utils/regexp'

export async function validCreateCustomer(req, res, next) {
  try {
    const { fullname, phone, email, address, identityCard, birthday } = req.body
    if (!fullname) throw new ServerError('Fullname is required', 400)
    if (fullname.trim() === '') throw new ServerError('Fullname is required', 400)
    if (!fullnameRule.test(fullname)) throw new ServerError('Incorrect fullname', 400)


    if (!phone) throw new ServerError('Phone is required', 400)
    if (phone.trim() === '') throw new ServerError('Phone is required', 400)
    if (!phoneRule.test(phone)) throw new ServerError('Incorrect phone', 400)

    if (email) {
      if (email.trim() === '') throw new ServerError('Email is required', 400)
      if (!emailRule.test(email)) throw new ServerError('Incorrect email', 400)
    }

    if (identityCard && identityCard.trim() === '') throw new ServerError('Identity Card is required', 400)

    if (address && address.trim() === '') throw new ServerError('Address is required', 400)

    if (!birthday) throw new ServerError('Birthday is required', 400)
    if (isNaN(new Date(birthday))) throw new ServerError('Birthday is required', 400)

    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validUpdateCustomer(req, res, next) {
  try {
    const { fullname, phone, email, address, identityCard, birthday } = req.body
    const { customerId } = req.params
    if (!Types.ObjectId.isValid(customerId)) throw new ServerError('Incorrect type of customer', 400)

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

export async function validGetCustomer(req, res, next) {
  try {
    const { customerId } = req.params
    if (!Types.ObjectId.isValid(customerId)) throw new ServerError('Incorrect type of customer', 400)
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function validGetCustomers(req, res, next) {
  try {
    const { skip, limit, email, identityCard, phone } = req.query

    if (skip && parseInt(skip) < 0) throw new ServerError('Invalid skip', 400)
    if (limit && parseInt(limit) < 0) throw new ServerError('Invalid limit', 400)
    if (phone) {
      if (phone.trim() === '') throw new ServerError('Phone is required', 400)
      if (!phoneRule.test(phone)) throw new ServerError('Incorrect phone', 400)
    }

    if (email) {
      if (email.trim() === '') throw new ServerError('Email is required', 400)
      if (!emailRule.test(email)) throw new ServerError('Incorrect email', 400)
    }

    if (identityCard && identityCard.trim() === '') throw new ServerError('Identity Card is required', 400)
    
    next()
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}