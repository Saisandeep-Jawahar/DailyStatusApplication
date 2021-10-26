import axios from 'axios'

const HttpRequest = function () {

    async function getVerb({
        url,
        success,
        failure
    }) {
        try {
            const result = await axios({
                method: 'get',
                url: url,
                baseURL: '',
                headers: {
                    'content-type': 'application/json'
                },
                data: ''
            })
            const response = result.data
            success(response)
        } catch (error) {
            failure(error)
        }
    }

    async function postVerb({
        url,
        data,
        success,
        failure
    }) {
        try {
            const result = await axios({
                method: 'post',
                url: url,
                baseURL: '',
                headers: {
                    'content-type': 'application/json'
                },
                data
            })
            const response = result.data
            success(response)
        } catch (error) {
            failure(error)
        }
    }

    async function putVerb({
        url,
        data,
        success,
        failure
    }) {
        try {
            const result = await axios({
                method: 'put',
                url: url,
                baseURL: '',
                headers: {
                    'content-type': 'application/json'
                },
                data
            })
            const response = result.data
            success(response)
        } catch (error) {
            failure(error)
        }
    }

    async function deleteVerb({
        url,
        data,
        success,
        failure
    }) {
        try {
            const result = await axios({
                method: 'delete',
                url: url,
                baseURL: '',
                headers: {
                    'content-type': 'application/json'
                },
                data
            })
            const response = result.data
            success(response)
        } catch (error) {
            failure(error)
        }
    }

    return {
        get: getVerb,
        post: postVerb,
        delete: deleteVerb,
        put: putVerb
    }
}

export default HttpRequest