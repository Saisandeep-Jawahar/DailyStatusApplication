import pairsDev from '../constants/pairsDev'
import moment from 'moment'

export const setStoryDetailObject = ({ storyDetail }) => {
    let pairProgrammers = [] 
    console.log(pairsDev)
    storyDetail.pairsDev.map((dev) => {
        pairProgrammers.push(getKeyByValue(pairsDev,dev))
    })
    
    let startDateValue = moment(storyDetail.startDate).format('MM-DD-YYYY')

    let endDateValue = storyDetail.endDate && moment(storyDetail.endDate).format('MM-DD-YYYY')


    let storyDetailObj = {
        taskID: storyDetail.storyNo,
        title: storyDetail.name,
        storyPoint: storyDetail.points,
        status: storyDetail.status,
        releaseVersion: storyDetail.releaseVersion,
        startDate: startDateValue,
        endDate: endDateValue || '',
        isOffshoreTester: storyDetail.isOffshoreTester,
        pairProgrammers

    }

    return storyDetailObj
}

const getKeyByValue = (obj, value) => {
    return  Object.keys(obj).find(key => obj[key] === value)
}