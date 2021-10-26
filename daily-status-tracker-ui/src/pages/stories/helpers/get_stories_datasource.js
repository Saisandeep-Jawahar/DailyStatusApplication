const getStoriesDataSource = (storiesPM) => {

    const stories = []
    storiesPM.forEach((story, index) => {
        stories.push({
            key: index + 1,
            no: index + 1,
            storyNo: story.getTask(),
            storyName: story.getTitle(),
            storyPoints: story.getStoryPoint(),
            startDate: story.getStartDate(),
            endDate: story.getEndDate(),
            status: story.getStatus(),
            releaseVersion: story.getReleaseVersion(),
            isOffshoreTester: story.isOffshoreTester(),
            pairProgrammers: story.getPairProgrammers()
        })
    })

    return stories

}

export default getStoriesDataSource
