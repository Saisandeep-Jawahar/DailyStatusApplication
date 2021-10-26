function UserPresentationModel({
    userId,
    //authToken,
    message,
    isAuthorizedUser
}) {
    this.getUserId = () => userId
    //this.getAuthToken = () => authToken
    this.getMessage = () => message
    this.isAuthorizedUser = () => isAuthorizedUser

    this.toObject = () => arguments[0]
}


export default UserPresentationModel