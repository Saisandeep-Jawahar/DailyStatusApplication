import { check } from 'express-validator'
import moment from 'moment'

export const storyRequestBodyValidator = [
        check('employeeID')
            .trim()
            .notEmpty()
            .withMessage('employeeID is required')
            .isNumeric()
            .withMessage('EmployeeId is invalid'),
        check('taskID')
            .trim()
            .notEmpty()
            .withMessage('Task ID is required')
            .isString()
            .withMessage('Task ID is invalid'),
        check('title')
            .trim()
            .notEmpty()
            .withMessage('Title is required')
            .isString()
            .withMessage('Title is invalid'),
        check('startDate')
            .trim()
            .notEmpty()
            .withMessage('StartDate is required')
            .custom((value) => moment(value, 'MM-DD-YYYY', true).isValid())
            .withMessage('StartDate is invalid'),
        // check('endDate')
        //     .optional()
        //     .isDate()
        //     .custom((value) => value && moment(value, "DD-MM-YYYY", true).isValid())
        //     .withMessage('EndDate should be in date format'),
        check('storyPoint')
            .trim()
            .notEmpty()
            .withMessage('StartDate is required')
            .isNumeric()
            .withMessage('Story point is required'),
        check('pairProgrammers')
            .isArray()
            .withMessage('Pair programmer should be in a numeric array format'),
        check('isOffshoreTester')
            .trim()
            .optional()
            .isBoolean()
            .withMessage('isOffshoreTester should be a boolean'),
        check('status')
            .trim()
            .notEmpty()
            .withMessage('status is required')
            .isString()
            .withMessage('Status is invalid'),
        check('releaseVersion')
            .trim()
            .notEmpty()
            .withMessage('Release version should not be empty')
            .isString()
            .withMessage('Release version is required')
    ]

export const storyDeleteRequestBodyValidator =  [
    check('employeeID')
    .trim()
    .notEmpty()
    .withMessage('employeeID is required')
    .isNumeric()
    .withMessage('EmployeeId is invalid'),
check('taskID')
    .trim()
    .notEmpty()
    .withMessage('Task ID is required')
    .isString()
    .withMessage('Task ID is invalid'),
    check('pairProgrammers')
            .isArray()
            .withMessage('Pair programmer should be in a numeric array format'),
    ]