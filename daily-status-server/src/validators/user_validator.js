import { check } from 'express-validator'

export const userRequestBodyValidator =  [
        check('employeeID')
            .trim()
            .isNumeric()
            .withMessage('employeeID is invalid')
            .notEmpty()
            .withMessage('employeeID is required'),
        check('employeeName')
            .trim()
            .notEmpty()
            .withMessage('employeeName is required')
            .isString()
            .withMessage('employeeName is required'),
        check('team')
            .trim()
            .notEmpty()
            .withMessage('team is required')
            .isString()
            .withMessage('team is required'),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('password is required')
            .isString()
            .withMessage('password is required'),
        check('emailId')
            .trim()
            .notEmpty()
            .withMessage('emailId is required')
            .isString()
            .isEmail()
            .withMessage('emailId is invalid'),
        check('project')
            .trim()
            .notEmpty()
            .withMessage('project is required')
            .isString()
            .withMessage('project is required'),
        check('hasAdminRights')
            .trim()
            .optional()
            .isBoolean()
            .withMessage('hasAdminRights should be a boolean'),
    ]

export const loginRequestBodyValidator = [
        check('employeeID')
            .trim()
            .notEmpty()
            .withMessage('employeeID is required')
            .isNumeric()
            .withMessage('employeeID is required'),
        check('password')
            .trim()
            .notEmpty()
            .withMessage('password is required')
            .isString()
            .withMessage('password is required'),
]