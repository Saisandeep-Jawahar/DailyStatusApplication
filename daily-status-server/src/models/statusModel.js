import mongoose from 'mongoose'

const statusSchema = new mongoose.Schema({
    employeeID: { type: Number, required: true },
    date: {type: Date,required: true},
    isPto:{type: Boolean,required: true, default: false},
    taskDescription:{type: String, required: false},
    workedHours:{type: Number, required: false},
    extraHours:{type: Number, required: false},
    blockersOrComments: {type: String, required: false},
    pairProgrammers:[Number]
})

const Status = mongoose.model('Status', statusSchema, 'Status')

export default Status