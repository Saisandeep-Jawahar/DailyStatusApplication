import { validationResult } from 'express-validator'

const requestBodyValidator = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array()[0].msg
        return res.status(400).json({ errors: error })
    }
    next()
}

export default requestBodyValidator
