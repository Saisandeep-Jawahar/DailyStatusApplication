import HttpRequest from '../api-adapter/http_request'

function StoriesRepo() {

    this.getStory = ({
        success,
        failure,
        userId
    }) => {
        const httpRequest = HttpRequest()
        httpRequest.get({
            url: `http://localhost:4001/story/getStory/${userId}`,
            
            success: (response) => {
                success(response)
            },
            failure: (error) => {
                failure(error)
            }
        })
        
    }

    this.addStory = ({
        employeeID,
        taskID,
        title,
        startDate,
        endDate,
        storyPoint,
        pairProgrammers,
        isOffshoreTester,
        status,
        releaseVersion,
        success,
        failure

    }) => {
        const httpRequest = HttpRequest()
        httpRequest.post({
            url: 'http://localhost:4001/story/addStory',
            data: {
                employeeID,
                taskID,
                title,
                startDate,
                endDate,
                storyPoint,
                pairProgrammers,
                isOffshoreTester,
                status,
                releaseVersion
            },
            success: (response) => {
                if(response.error) 
                 failure(response.error)
                else
                 success(response)
            },
            failure: (error) => {
                failure(error)
            }
        })
    }

    this.deleteStory = ({
        employeeID,
        taskID,
        pairProgrammers,
        success,
        failure
    }) => {
        const httpRequest = HttpRequest()
        httpRequest.delete({
            url: 'http://localhost:4001/story/deleteStory',
            data: {
                employeeID,
                taskID,
                // title,
                // startDate,
                // endDate,
                // storyPoint,
                 pairProgrammers,
                // isOffshoreTester,
                // status,
                // releaseVersion
            },
            success: (response) => {
                if(response.error) 
                 failure(response.error)
                else
                 success(response)
            },
            failure: (error) => {
                failure(error)
            }
    })
    }

    this.updateStory = ({
        employeeID,
        taskID,
        title,
        startDate,
        endDate,
        storyPoint,
        pairProgrammers,
        isOffshoreTester,
        status,
        releaseVersion,
        success,
        failure

    }) => {
        const httpRequest = HttpRequest()
        httpRequest.put({
            url: 'http://localhost:4001/story/updateStory',
            data: {
                employeeID,
                taskID,
                title,
                startDate,
                endDate,
                storyPoint,
                pairProgrammers,
                isOffshoreTester,
                status,
                releaseVersion
            },
            success: (response) => {
                if(response.error) 
                 failure(response.error)
                else
                 success(response)
            },
            failure: (error) => {
                failure(error)
            }
        })
    }
}

export default StoriesRepo