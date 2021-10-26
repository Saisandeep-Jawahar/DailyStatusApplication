
import StoriesRepo from '../repos/stories_repo'

const addStories = (
    {
        userId,
        storyDetail,
        observer
    }
) => {
    const {title,
        storyPoint,
        status,
        releaseVersion,
        startDate,
        endDate,
        isOffshoreTester,
        pairProgrammers,
        taskID
    } = storyDetail
    const storiesRepo = new StoriesRepo()
    storiesRepo.addStory({
        employeeID : userId,
        taskID,
        title,
        startDate,
        endDate,
        storyPoint,
        pairProgrammers,
        isOffshoreTester,
        status,
        releaseVersion,
        success: (response) => {
           observer.addStorySuccess(response)
        },
        failure: (error) => {
           observer.addStoryFailure(error)
        }
    })
}

export default addStories
