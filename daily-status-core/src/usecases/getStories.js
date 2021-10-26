import StoriesRepo from '../repos/stories_repo'
import getStoriesConverters from '../converters/get_stories-converter'

const getStories = (
    {
        userId,
        receiveStoriesSuccess,
        receiveStoriesError
    }
) => {
    const storiesRepo = new StoriesRepo()
    storiesRepo.getStory({
        userId,
        success: (response) => {
            receiveStoriesSuccess(getStoriesConverters(response))
        },
        failure: (error) => {
            receiveStoriesError(error)
        }
    })
}

export default getStories
