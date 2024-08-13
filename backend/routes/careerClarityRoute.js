import express from 'express'
import {
    insertScore,
    viewAllLearningpaths,
    viewLearningpath
} from '../controllers/careerclarityController.js'

const router = express.Router()

router.post('/score',insertScore)
router.get('/learningpaths',viewAllLearningpaths)
router.get('/learningpath:id',viewLearningpath)

export default router