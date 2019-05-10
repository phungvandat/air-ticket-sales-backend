import { Router } from 'express'

import * as authController from '../controllers/authController'
import * as airTicketController from '../controllers/airTicketController'
import * as mwAirTicketController from '../controllers/mwControllers/mwAirTicket'

const routes = Router()

// Create airTicket
routes.post('/',
  authController.authenticateUser,
  mwAirTicketController.validCreateAirTicket,
  airTicketController.createAirTicket
)
// Get airTickets
routes.get('/',
  mwAirTicketController.validGetAirTickets,
  airTicketController.getAirTickets
)
// Get airTicket
routes.get('/:airTicketId',
  mwAirTicketController.validGetAirTicket,
  airTicketController.getAirTicket
)

export default routes