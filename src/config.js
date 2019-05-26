import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.BVMB_BACKEND_PORT,
  MONGO_URL: process.env.BVMB_MONGO_URL,
  JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN,
  CORS: process.env.CORS,
}