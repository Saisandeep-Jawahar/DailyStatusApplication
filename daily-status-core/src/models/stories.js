function Stories({
    taskID,
    title,
    startDate,
    endDate,
    storyPoint,
    status,
    releaseVersion,
    isOffshoreTester,
    pairProgrammers,
}) {
    this.getTask = () => taskID
    this.getTitle = () => title
    this.getStartDate = () => startDate,
    this.getEndDate = () => endDate,
    this.getStoryPoint = () => storyPoint
    this.getStatus = () => status
    this.getReleaseVersion = () => releaseVersion
    this.isOffshoreTester = () => isOffshoreTester
    this.getPairProgrammers = () => pairProgrammers
    this.toObject = () => ({
        taskID: this.getTask(),
        title: this.getTitle(),
        startDate: this.getStartDate(),
        endDate: this.getEndDate(),
        storyPoint: this.getStoryPoint(),
        status: this.getStatus(),
        releaseVersion: this.getReleaseVersion()
    })

}

export default Stories
