import { Router } from 'express'

import * as authController from '../controllers/authController'
import * as airportController from '../controllers/airportController'
import * as mwAirportController from '../controllers/mwControllers/mwAirport'

const routes = Router()

// Create airport
routes.post('/', authController.authenticateUser, mwAirportController.validCreateAirport, airportController.createAirport)

export default routes