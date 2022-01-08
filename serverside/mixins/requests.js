class RequestsMixin {
    /* To return raw error messages on Dev alone, and Internal Server Error on production */
    static customErrorMessage = message => {
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
            return Promise.reject('Internal Server Error')
        } else {
            return Promise.reject(message)
        }
    }
}

module.exports = RequestsMixin
