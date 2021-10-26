import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
  employeeID: { type: Number, required: true },
  taskID: { type: String, required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false },
  storyPoint: { type: Number, required: true },
  pairProgrammers: [Number],
  isOffshoreTester: { type: Boolean, required: true, default: false },
  status: { type: String, required: true },
  releaseVersion: { type: String, required: true }
})

const Story = mongoose.model('Story', storySchema, 'Story')

export default Story
