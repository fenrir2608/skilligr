import express from 'express'
import {
    insertScore,
    viewAllLearningpaths,
    viewLearningpath
} from '../controllers/careerClarityController.js'
import { verify } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/score',verify, insertScore)
router.get('/learningpaths',verify, viewAllLearningpaths)
router.get('/learningpath:id',verify, viewLearningpath)

export default router