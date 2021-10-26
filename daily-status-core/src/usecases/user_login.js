import getUserConverter from '../converters/get_user_converter'
import UserRepo from '../repos/user_repo'
const userLogin = (
    {
        userId,
        password,
        authenticationSuccess,
        authenticationError
    }
) => {
    const userRepo = new UserRepo()
    userRepo.authenticate({
        userId: userId.trim(),
        password: password.trim(),
        success: ({
            userId,
            //authToken,
            message
        }) => {
            authenticationSuccess(getUserConverter({ userId,
                //authToken,
                message}))
        },
        failure: (error) => {
            authenticationError(error)
        }
    }) 
}

export default userLogin