import express from 'express'
import {createUser, loginUser} from '../controllers/user/userController'
import { userRequestBodyValidator, loginRequestBodyValidator } from '../validators/user_validator'
import requestBodyValidator from '../validators/validator_result'

const userRouter=express.Router()

userRouter.post('/register', userRequestBodyValidator, requestBodyValidator, createUser)
userRouter.post('/login', loginRequestBodyValidator, requestBodyValidator, loginUser)

export default userRouter