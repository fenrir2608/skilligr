import express from 'express'
import {
    addScore
} from '../controllers/careerClarityRoute.js'

const router = express.Router()

router.post('/score',addScore)

export default router