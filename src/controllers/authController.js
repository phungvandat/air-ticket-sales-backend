import jwt from 'jsonwebtoken'
import moment from 'moment'
import configs from '../config'
import logger from '../utils/logger'
import ServerError from '../utils/serverError'
import User from '../models/user'
import { ROLES } from '../utils/constants'

// Create token
function createToken(user, exp) {
  const payload = { user, exp: exp || moment().add(6, 'month').unix() }
  return `JWT ${jwt.sign(payload, configs.JWT_SECRET_TOKEN)}`
}

// Verify token
export async function verifyToken(req, res, next) {
  if (req.method === 'OPTIONS') {
    // CROS: the browser will preflight a request 
    // to check which params are accepted by the server 
    // before sending the actual request,
    // so we need to ignore verifyToken() here
    return next()
  }
  try {
    const authorization = req.get('Authorization')
    if (!authorization) return next()

    const token = authorization.split(' ')[1]
    const payload = await new Promise((resolve, reject) => (
      jwt.verify(token, configs.JWT_SECRET_TOKEN, function (err, payload) {
        if (err) return reject(err)
        resolve(payload)
      })
    ))
    req.user = { ...payload.user }
    next()

  } catch (error) {
    logger.error(error)
    if (error.message === 'jwt expired') {
      return res.status(error.code || 500).json({ message: error.message })
    }
    next()
  }
}

// Login CMS
export async function loginCMS(req, res) {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username }).select('+password')
    if (!user) throw new ServerError('Invalid username', 404)
    if (user.role !== ROLES.ADMIN
      && user.role !== ROLES.MODERATOR
    ) {
      throw new ServerError('Access denied', 403)
    }
    const isMatched = await user.comparePassword(password)
    if (!isMatched) throw new ServerError('Wrong password', 401)
    const payloadObj = {
      _id: user._id,
      email: user.email,
      role: user.role,
    }
    const token = createToken(payloadObj)
    res.json({
      message: 'Success',
      user: {
        _id: user._id,
        token: token,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    logger.error(error)
    res.status(error.code || 500).json({ message: error.message })
  }
}

/*
  Authenticate  \ User
*/
export async function authenticateUser(req, res, next) {
  if (req.method === 'OPTIONS') {
    // CROS: the browser will preflight a request 
    // to check which params are accepted by the server 
    // before sending the actual request,
    // so we need to ignore authUser() here
    return next()
  }

  try {
    const currentUser = req.user
    if (!currentUser) throw new ServerError('Please login to continue', 401)

    const user = await User.findById(currentUser._id)

    if (!user) throw new ServerError('Account is not found', 404)

    next()
  } catch (error) {
    logger.error(error)
    res.status(error.code || 500).json({ message: error.message })
  }
}
