import express from 'express'
import { addStatus, displayStatus } from '../controllers/status/statusController'

const statusRouter = express.Router()
statusRouter.post('/addStatus',addStatus)
statusRouter.get('/displayStatus/:empId',displayStatus)

export default statusRouter