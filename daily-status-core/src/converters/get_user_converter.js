import UserPresentationModel from '../models/user_presentation_model'

const getUserConverter = ({
    userId,
    //authToken,
    message
}) => {
    const isAuthorizedUser = message === 'Logged in successfully'
    return new UserPresentationModel({
        userId,
        //authToken,
        message,
        isAuthorizedUser
    })
}

export default getUserConverter