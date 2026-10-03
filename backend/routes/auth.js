import express from 'express';
import { signup} from "../controllers/authController.js"

const apiRouter = express.Router()

apiRouter.post('/signup', signup)

export default apiRouter