import express from 'express'
import { createStory, deleteStory, getStory, updateStory } from './../controllers/story/storyController'
import { storyDeleteRequestBodyValidator, storyRequestBodyValidator } from '../validators/story_validator'
import requestBodyValidator from '../validators/validator_result'

const storyRouter = express.Router()

storyRouter.post('/addStory', storyRequestBodyValidator, requestBodyValidator ,createStory)
storyRouter.get('/getStory/:empId', getStory)
storyRouter.put('/updateStory', storyRequestBodyValidator, requestBodyValidator, updateStory)
storyRouter.delete('/deleteStory',storyDeleteRequestBodyValidator, requestBodyValidator, deleteStory)

export default storyRouter