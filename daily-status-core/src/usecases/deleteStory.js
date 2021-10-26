const { default: StoriesRepo } = require("../repos/stories_repo")

const deleteStories = ({
    userId,
    taskID,
    pairProgrammers,    
    deleteStorySuccess,
    deleteStoryFailure

}) => {

    const storiesRepo = new StoriesRepo()
    storiesRepo.deleteStory({
        employeeID: userId,
        taskID,        
        pairProgrammers,
        
        success: (response) => {
            deleteStorySuccess()
        },
        failure: (error) => {
            deleteStoryFailure(error)
        },
    })
}

export default deleteStories