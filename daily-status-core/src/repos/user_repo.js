import HttpRequest from '../api-adapter/http_request'

function UserRepo() {

    this.authenticate = ({
        userId,
        password,
        success,
        failure
    }) => {
        const httpRequest = HttpRequest()
        httpRequest.post({
            url: 'http://localhost:4001/users/login',
            data: {
                employeeID: userId,
                password,
            },
            success: (response) => {
                success({
                    userId: response.employeeID,
                    //authToken: response.data.token,
                    message: response.message
                })
            },
            failure: (error) => {
                failure(error)
            }

        })
    }

    this.createAccount = ({
        employeeID,
        employeeName,
        team,
        password,
        project,
        emailId,
        success,
        failure
    }) => {
        const httpRequest = HttpRequest()
        httpRequest.post({
            url: 'http://localhost:4001/users/register',
            data: {
                employeeID,
                employeeName,
                team,
                password,
                project,
                emailId,
                hasAdminRights: false
            },

            success: (response) => {

                success({

                    msg: response.message
                })
            },
            failure: (error) => {
                failure(error)
            }

        })
    }
}

export default UserRepo