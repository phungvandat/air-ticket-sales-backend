import { Router } from 'express'

import * as authController from '../controllers/authController'
import * as customerController from '../controllers/customerController'
import * as mwCustomerController from '../controllers/mwControllers/mwCustomer'

const routes = Router()

// Create customer
routes.post('/',
  authController.authenticateUser,
  mwCustomerController.validCreateCustomer,
  customerController.createCustomer
)
// Update customer
routes.put('/:customerId',
  authController.authenticateUser,
  mwCustomerController.validUpdateCustomer,
  customerController.updateCustomer
)
// Get customers
routes.get('/',
  mwCustomerController.validGetCustomers,
  customerController.getCustomers
)
// Get customer
routes.get('/:customerId',
  mwCustomerController.validGetCustomer,
  customerController.getCustomer
)

export default routes