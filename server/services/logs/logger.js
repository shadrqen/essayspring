const { decodeToken } = require('../users/auth')
const { postDBRequest } = require('../database/connect')

class LoggerService {
  /* Captures all requests and sends them to the DMBS for saving on the database */
  static async logger (req, res, next) {
    /* We release control to the next function as soon as we hit the function so that we can
     * do the rest on the background */
    next()
    const LOG = {
      ip: null,
      email: null,
      userType: null,
      origin: null,
      referer: null,
      originalUrl: null,
      userAgent: null,
      formData: {},
      suspect: null
    }
    const origin = req.headers.origin
    const referer = req.headers.referer
    const originalUrl = req.originalUrl
    LOG.origin = origin
    LOG.referer = referer
    LOG.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    LOG.originalUrl = originalUrl
    LOG.userAgent = req.headers['user-agent']
    LOG.suspect = !(origin && [process.env.WC_DEV_URL, 'https://essayspring.com'].includes(origin))
    const urlsBodyNotLogged = ['/auth/v1/auth/facebook', '/auth/v1/auth/google',
      '/auth/v1/login_user', '/auth/v1/submit_login_email']
    if (!urlsBodyNotLogged.includes(originalUrl)) {
      LOG.formData = req.body
    }
    if (req.headers.access) {
      await decodeToken(req.headers.access)
        .then(tokens => {
          if (tokens.status === 'success') {
            LOG.email = tokens.message.sub
            LOG.userType = tokens.message.user
          } else {
            LOG.userType = 'Other'
          }
        })
        .catch(() => {
          LOG.userType = 'Other'
        })
    } else {
      LOG.userType = 'Other'
    }
    /* TODO: To handle the success and error responses */
    await postDBRequest('logs/v1/save_log', LOG)
      .then(() => {})
      .catch(() => {})
  }
}

module.exports = LoggerService
