import Stories from "../models/stories";
import moment from 'moment'

const getStoriesConverters = (response) => {
  
  const data = response ? response.map(story =>
   new Stories({
    taskID: story.taskID,
    title: story.title,
    startDate: moment(story.startDate).format("DD-MM-YYYY") || '--',
    endDate:story.endDate ? moment(story.endDate).format("DD-MM-YYYY") : '--' ,
    storyPoint: story.storyPoint,
    status: story.status,
    releaseVersion: story.releaseVersion,
    isOffshoreTester: story.isOffshoreTester,
    pairProgrammers: story.pairProgrammers
  })) : new Stories({})
  return data
}

export default getStoriesConverters;
