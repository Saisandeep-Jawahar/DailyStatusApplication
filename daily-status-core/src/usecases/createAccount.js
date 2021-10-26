import UserRepo from '../repos/user_repo'

const createAccount = (
    {
        employeeID,
        employeeName,
        team,
        password,
        emailId,
        project,
        receiveSuccessRegistration,
        receiveFailureRegistration
    }
) => {
    const userRepo = new UserRepo()
    userRepo.createAccount({
        employeeID,
        employeeName,
        team,
        password,
        emailId,
        project,
        success: ({
            msg
        }) => {
            receiveSuccessRegistration({ msg })

        },
        failure: (error) => {
            receiveFailureRegistration(error)
        }

    })


}

export default createAccount