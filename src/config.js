import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.WEVA_BACKEND_PORT,
  MONGO_URL: process.env.WEVA_MONGO_URL,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  CORS: process.env.CORS,
}