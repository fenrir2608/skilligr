import express from 'express'
import {
    viewAllPaths,
    viewPaths
} from '../controllers/learningPathsController.js'

const router = express.Router()

router.get('/path',viewAllPaths)
router.get('/path/:id',viewAllPaths)

export default router