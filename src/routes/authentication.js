import { Router } from 'express'

import * as authController from '../controllers/authController'

const routes = Router()

// Login CMS
routes.post('/login-cms', 
  authController.loginCMS
)

export default routes