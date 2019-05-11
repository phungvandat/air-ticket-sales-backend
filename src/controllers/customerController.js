import logger from '../utils/logger'
import ServerError from '../utils/serverError'
import Customer from '../models/customer'


export async function createCustomer(req, res) {
  try {
    const { fullname, phone, email, address, identityCard, birthday } = req.body

    let customer = new Customer({
      fullname,
      phone,
      email,
      address,
      identityCard,
      birthday,
    })

    customer = await customer.save()

    res.status(200).json({
      message: 'Success',
      customer,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function updateCustomer(req, res) {
  try {
    const { fullname, phone, email, address, identityCard, birthday } = req.body
    const { customerId } = req.params

    let customer = await Customer.findById(customerId)

    if (!customer) throw new ServerError('Customer is not exists', 400)

    const objUpdate = {
      fullname,
      phone,
      email,
      address,
      identityCard,
      birthday,
    }

    Object.keys(objUpdate).forEach(item => {
      if (objUpdate[item] === undefined) delete objUpdate[item]
    })

    customer.set(objUpdate)

    customer = await customer.save()
    res.status(200).json({
      message: 'Success',
      customer,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getCustomer(req, res) {
  try {
    const { customerId } = req.params

    const customer = await Customer.findById(customerId)

    if (!customer) throw new ServerError('Customer is not exists', 400)

    res.status(200).json({
      message: 'Success',
      customer,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}

export async function getCustomers(req, res) {
  try {
    const { skip, limit, email, identityCard, phone } = req.query

    const objQuery = {}

    if (email) objQuery.email = new RegExp(email, 'i')
    if (phone) objQuery.phone = new RegExp(phone, 'i')
    if (identityCard) objQuery.identityCard = new RegExp(identityCard, 'i')

    const customers = await Customer.find(objQuery)
      .skip(parseInt(skip))
      .limit(parseInt(limit))

    res.status(200).json({
      message: 'Success',
      customers,
    })
  } catch (err) {
    logger.error(err)
    res.status(err.code || 500).json({ message: err.message })
  }
}