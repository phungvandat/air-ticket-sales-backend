import { Router } from 'express'

import * as authController from '../controllers/authController'
import * as flightController from '../controllers/flightController'
import * as mwFlightController from '../controllers/mwControllers/mwFlight'

const routes = Router()

// Create flight
routes.post('/', authController.authenticateUser, mwFlightController.validCreateFlight, flightController.createFlight)

export default routes