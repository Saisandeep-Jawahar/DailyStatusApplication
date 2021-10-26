
import StoriesRepo from '../repos/stories_repo'

const updateStory = (
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
    storiesRepo.updateStory({
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
           observer.updateStorySuccess(response)
        },
        failure: (error) => {
           observer.updateStoryFailure(error)
        }
    })
}

export default updateStory
