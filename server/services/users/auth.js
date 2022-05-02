'use strict'

/* Importing modules
   nodemailer helps in sending mails */
const nodemailer = require('nodemailer')

const AXIOS = require('axios')

const EMAIL_OTP = require('../../views/otp_email')

const WELCOME_EMAIL = require('../../views/welcome_email')

const NEW_CLIENT_IN = require('../../views/admin_new_client_notification')

const { google } = require('googleapis')

const REQUESTS_MIXIN = require('../../mixins/requests')

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: 'https://essayspring.com/users/oauth' // this must match your google api settings
}

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection () {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  )
}

/* Encrypts the user's passwords
 It is a password-hashing function based on the Blowfish cipher
*/
const BCRYPT = require('bcrypt')

/* Generates web tokens to send back to client */
const JWT = require('jsonwebtoken')

const REDIS_CLIENT = require('../other/redis')

const { getDBRequest, postDBRequest } = require('../database/connect')

let authSecretKey
if (process.env && process.env.NODE_ENV === 'production') {
  authSecretKey = process.env.AUTH_SECRET_KEY
} else {
  authSecretKey = process.env.DEV_AUTH_SECRET_KEY
}

/* The authentication service that deals with login, signup and access to resources */
class AuthService {
  static async getRequest (url) {
    return await getDBRequest(url)
      .then(response => response)
      .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
  }

  static async postRequest (url, body) {
    return await postDBRequest(url, body)
      .then(response => response)
      .catch(error => REQUESTS_MIXIN.customErrorMessage(error))
  }

  /* Function to return OTP Codes */
  static generateOTP () {
    const DIGITS = '0123456789'
    const OTP_LENGTH = 6
    let otp = ''
    for (let i = 1; i <= OTP_LENGTH; i++) {
      const INDEX = Math.floor(Math.random() * (DIGITS.length))
      otp = otp + DIGITS[INDEX]
    }
    return otp
  }

    /*
    * The function that generates the access token.
    * There are two types of tokens:
    *   - Access (Used for access to serverside resources).
    *   - Refresh (Used to get new access tokens after they expire)
    */
    static generateAccessToken = (email, expiryMinutes, userType) => JWT.sign({
      sub: email,
      user: userType
    }, authSecretKey, { expiresIn: expiryMinutes });

    /* Generates refresh tokens. Lasts far much longer than the access token. Used to get access tokens */
    static generateRefreshToken = (email, userType) => JWT.sign({
      sub: email,
      user: userType
    }, authSecretKey, { expiresIn: '60min' })

    /* Decodes the tokens to access the encoded data that is part of the token */
    static async decodeToken (token) {
      try {
        // Verify the token using the Secret key that was used to encode the token
        const DECODED_TOKEN = await JWT.verify(token, authSecretKey)
        return { status: 'success', message: DECODED_TOKEN }
      } catch (err) {
        return { status: 'Fail', message: err }
      }
    }

    /* Authentication middleware for the Writeray Portal */
    static writerayAuth (req, res, next) {
      let apiKey
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        apiKey = process.env.WR_NEW_BID_SECRET || 'sec'
      } else {
        apiKey = process.env.DEV_WR_NEW_BID_SECRET || 'sec'
      }
      if (req.headers['nb-api-key'] === apiKey) {
        next()
      } else {
        res.send()
      }
    }

    /* Middleware for the Writeray Micro-Service (backend) */
    static writerayMicroServiceAuth (req, res, next) {
      let apiKey
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        apiKey = process.env.WR_NEW_BID_SECRET || 'sec'
      } else {
        apiKey = process.env.DEV_WR_NEW_BID_SECRET || 'sec'
        next()
      }
      if (req.headers['nb-api-key'] === apiKey) {
        next()
      } else {
        res.send()
      }
    }

    /* Confirms whether an access token is still valid or not */
    static auth (req, res, next) {
      const ORIGIN = req.headers.origin
      if (ORIGIN) {
        if ([process.env.WC_DEV_URL, 'https://essayspring.com'].includes(ORIGIN)) {
          try {
            // Verify the token using the Secret key that was used to encode the token
            JWT.verify(req.headers.access, authSecretKey, function (accessError, accessDecoded) {
              if (accessError) {
                throw new Error(accessError)
              } else {
                next()
              }
            })
          } catch (err) {
            if (err.message === 'TokenExpiredError: jwt expired') {
              res.status(401).send('TokenExpiredError')
            } else {
              res.render('404')
            }
          }
        } else {
          res.render('404')
        }
      } else {
        res.render('404')
      }
    }

    static cors (req, res, next) {
      const ORIGIN = req.headers.origin
      if (ORIGIN) {
        if ([process.env.WC_DEV_URL, 'https://essayspring.com'].includes(ORIGIN)) {
          next()
        } else {
          res.render('404')
        }
      } else {
        res.render('404')
      }
    }

    /* Refreshes a user's token in case the access token expires */
    static async refreshToken (req, res) {
      try {
        /* Verify the token using the Secret key that was used to encode the token
            * Verify that the user's access token has expired and that the refresh one is yet to expire */

        return JWT.verify(req.headers.refresh, authSecretKey, async function (refreshError, refreshDecoded) {
          if (refreshError) {
            /* eslint-disable prefer-promise-reject-errors */
            return Promise.reject('TokenExpiredError: jwt expired')
            /* eslint-enable prefer-promise-reject-errors */
          } else {
            const DECODED_TOKEN = await AuthService.decodeToken(req.headers.refresh)
            const NEW_ACCESS = AuthService.generateAccessToken(DECODED_TOKEN.message.sub, '15min', DECODED_TOKEN.message.user)
            const NEW_REFRESH = AuthService.generateRefreshToken(DECODED_TOKEN.message.sub, DECODED_TOKEN.message.user)
            return { response: 'success', newAccess: NEW_ACCESS, newRefresh: NEW_REFRESH }
          }
        })
      } catch (err) {
        if (err.message === 'TokenExpiredError: jwt expired') {
          /* TODO: To make the promise jection to be an error */
          /* eslint-disable prefer-promise-reject-errors */
          return Promise.reject('TokenExpiredError')
          /* eslint-enable prefer-promise-reject-errors */
        } else {
          return REQUESTS_MIXIN.customErrorMessage(err)
        }
      }
    }

    static async registerUser (req) {
      return await postDBRequest('users/v1/add_client', req.body)
        .then(async res => {
          const ACCESS_TOKEN = await AuthService.generateAccessToken(req.body.email, '15min', 'Client')
          const REFRESH_TOKEN = await AuthService.generateRefreshToken(req.body.email, 'Client')
          return {
            accessToken: ACCESS_TOKEN,
            refreshToken: REFRESH_TOKEN,
            response: 'success',
            isNew: res.response !== 'Email already exists',
            /* TODO: Why this -> email: req.body.name ? req.body.email : null */
            email: req.body.email
          }
        })
        .catch(error => {
          return Promise.reject(error.response.data.error)
        })
    }

    static async loginUser (req) {
      const EMAIL = req.body.email
      const PASSWORD = req.body.password

      return await postDBRequest('users/v1/web_user_by_email', {
        email: EMAIL,
        gotStarted: req.body.gotStarted
      })
        .then(async user => {
          if (user.type) {
            /* Facebook or Google authentication does not require passwords */
            if (user.user.password || ['Facebook', 'Google'].includes(user.loginVia)) {
              let match = false
              /* For a user who registered through email but currently logs in using Facebook or Google
                        * The user has to continue using email for authentication */
              if (user.loginVia === 'Email' && !PASSWORD) {
                return { message: 'Kindly log in by email', email: EMAIL }
              }
              if (user.user.password) {
                match = await BCRYPT.compare(PASSWORD, user.user.password)
              } else {
                /* No password here means that the user registered using Facebook or Google */
                match = true
              }
              if (match) {
                await AuthService.postRequest('users/v1/save_login', {
                  email: EMAIL,
                  source: 'EssaySpring'
                })
                const ACCESS_TOKEN = AuthService.generateAccessToken(EMAIL, '15min', 'Client')
                const REFRESH_TOKEN = AuthService.generateRefreshToken(EMAIL, 'Client')
                return {
                  message: 'success',
                  userType: user.type,
                  orderDetails: user.orderDetails,
                  paperDiscount: user.paperDiscount ? user.paperDiscount.discount : 0,
                  orderFiles: user.orderFiles || [],
                  orderPostingStep: user.orderPostingStep,
                  orderPaymentDetails: user.orderPaymentDetails || null,
                  orderAlreadyPaidFor: user.orderAlreadyPaidFor || false,
                  orderAssignment: user.orderAssignment || null,
                  accessToken: ACCESS_TOKEN,
                  refreshToken: REFRESH_TOKEN,
                  email: EMAIL
                }
              } else {
                return { message: 'Email and/or password mismatch' }
              }
            } else {
              return { message: 'Kindly set your password to continue' }
            }
          } else {
            return { message: 'Account already taken' }
          }
        })
        .catch(error => {
          return REQUESTS_MIXIN.customErrorMessage(error)
        })
    }

    static sendEmail (details) {
      const MAIL_OPTIONS = {
        from: null,
        to: details.to,
        subject: details.subject,
        html: details.html
      }
      let transporter, user, pass
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        if (details.info) {
          user = process.env.INFO_EMAIL_USER
          pass = process.env.INFO_EMAIL_PASS
          MAIL_OPTIONS.from = 'EssaySpring '.concat(process.env.INFO_EMAIL_USER)
        } else {
          user = process.env.PRIMARY_EMAIL_USER
          pass = process.env.PRIMARY_EMAIL_PASS
          MAIL_OPTIONS.from = 'EssaySpring Support '.concat(process.env.PRIMARY_EMAIL_USER)
        }
        transporter = nodemailer.createTransport({
          host: process.env.PRIMARY_EMAIL_DOMAIN,
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: user,
            pass: pass
          }
        })
      } else {
        /* We use Gmail and nodemailer for sending emails on development */
        MAIL_OPTIONS.from = process.env.GMAIL_USER
        /* Instantiating the nodemailer email options */
        transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS /* This comes from Google account, you have to request for one */
          }
        })
      }
      /* We are currently using transporter to send emails directly from an email server.
        * Plans are currently underway to send emails through relay services such as Mailgun or Mailjet */
      return new Promise((resolve, reject) => {
        transporter.sendMail(MAIL_OPTIONS, async (error, info) => {
          if (error) {
            reject(error)
          } else {
            resolve(true)
          }
        })
      })
    }

    /* We log in by first submitting an email address, then password if a user exists.
    * Else register the user or tell him/her to set the password.
    * New clients are registered and logged in automatically without having to set their passwords.
    * However, one has to set a password if he/she logs in for the second time. */
    static async submitLoginEmail (req) {
      return await postDBRequest('users/v1/submit_login_email', { email: req.email })
        .then(res => {
          /* A person could be registered as a writer or admin, hence not allowed to log in
                * on this platform since emails are unique and once can only register as one type
                * per email. Also, such users have their platforms through which they can log in. */
          if (res.accountExists && res.type !== 'Client') {
            return {
              accountExists: true,
              type: 'NonClient',
              canLogIn: false
            }
          }
          if (res.accountExists && res.shouldSetPass) {
            const CODE_PAYLOAD = {
              codeIntention: 'setting',
              intention: 'set',
              email: req.email,
              redisPrefix: 'Client-OTP-'
            }
            return AuthService.sendOTPCode(CODE_PAYLOAD)
          }
          /* For a new user, register him/her, send welcome email and then send back the authentication
                * tokens to be logged in on the clientside. */
          if (!res.accountExists) {
            let url, unsubscribeHost
            if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
              url = 'https://essayspring.com'
              unsubscribeHost = 'https://api.essayspring.com'
            } else {
              url = `http://${process.env.URL}:4100`
              unsubscribeHost = `http://${process.env.URL}:3100`
            }
            const UNSUBSCRIBE_URL = unsubscribeHost.concat('/orders/v1/notification/email/unsubsribe')
            const HTML_TO_SEND = WELCOME_EMAIL.welcomeEmail(url, UNSUBSCRIBE_URL)
            const EMAIL_DETAILS = {
              to: req.email,
              subject: 'Welcome to EssaySpring',
              html: HTML_TO_SEND,
              info: true
            }
            AuthService.sendEmail(EMAIL_DETAILS)
            let adminUrl, email
            if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
              adminUrl = 'https://app.writeray.com/'
              email = process.env.USERS_EMAIL
            } else {
              adminUrl = `http://${process.env.WR_URL}:82`
              email = process.env.LOCAL_USERS_EMAIL
            }
            /* Also send the admin an email to notify of new users joining the platform */
            try {
              const ADMIN_MSG = `A new client ${req.email} has joined the platform.`
              const HTML_TO_SEND_ADMIN = NEW_CLIENT_IN.newClientEmail(ADMIN_MSG, adminUrl.concat('users/all'), 'A New Client Has Joined The System')
              const ADMIN_EMAIL_DETAILS = {
                to: email,
                subject: 'New Client Update',
                html: HTML_TO_SEND_ADMIN,
                info: true
              }
              AuthService.sendEmail(ADMIN_EMAIL_DETAILS)
            } catch (e) {
              console.log(e)
            }
          }
          return res
        })
        .catch(error => {
          return REQUESTS_MIXIN.customErrorMessage(error)
        })
    }

    static async googleAuth (req) {
      try {
        const AUTH = createConnection()
        const CODE = req.body.code
        const { tokens } = await AUTH.getToken(CODE)
        // Fetch the user's profile with the access token and bearer
        return await AXIOS
          .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
                    {
                      headers: {
                        Authorization: `Bearer ${tokens.id_token}`
                      }
                    }
          )
          .then(async res => {
            /* TODO: To combine the functionality below with that of Facebook */
            return await AuthService.submitLoginEmail(res.data)
              .then(async emailSubmitResponse => {
                if (emailSubmitResponse.accountExists) {
                  if (emailSubmitResponse.type === 'Client') {
                    return await AuthService.loginUser({ body: { email: res.data.email } })
                      .then(loginResponse => {
                        return loginResponse
                      })
                      .catch(loginError => {
                        throw new Error(loginError)
                      })
                  } else {
                    return { message: 'Account already taken', email: res.data.email }
                  }
                } else {
                  return await AuthService.registerUser({
                    body: {
                      userType: 'Client',
                      email: res.data.email,
                      name: res.data.name,
                      picture: res.data.picture,
                      loginType: 'Google'
                    }
                  })
                    .then(registerResponse => {
                      return registerResponse
                    })
                    .catch(registerError => {
                      throw new Error(registerError)
                    })
                }
              })
              .catch(err => {
                throw new Error(err)
              })
          })
          .catch(error => {
            throw new Error(error)
          })
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async facebookAuth (req) {
      try {
        return AXIOS.get(`https://graph.facebook.com/v8.0/me?fields=id,name,email,picture&access_token=${req.accessToken}`)
          .then(async response => {
            const { data } = response
            if (data.error) return { status: 401, data: { message: 'Unauthorized' } }
            /* TODO: To combine the functionality below with that of Facebook */
            return await AuthService.submitLoginEmail({ email: data.email })
              .then(async emailSubmitResponse => {
                if (emailSubmitResponse.accountExists) {
                  if (emailSubmitResponse.type === 'Client') {
                    return await AuthService.loginUser({ body: { email: data.email } })
                      .then(loginReponse => {
                        return loginReponse
                      })
                      .catch(loginError => {
                        throw new Error(loginError)
                      })
                  } else {
                    return { message: 'Email already used as a writer! Kindly use another email', email: data.email }
                  }
                } else {
                  return await AuthService.registerUser({
                    body: {
                      userType: 'Client',
                      facebookId: data.id,
                      email: data.email,
                      name: data.name,
                      picture: data.picture.data.url ? data.picture.data.url : null,
                      loginType: 'Facebook'
                    }
                  })
                    .then(registerResponse => {
                      return registerResponse
                    })
                    .catch(registerError => {
                      throw new Error(registerError)
                    })
                }
              })
              .catch(emailSubmitError => {
                throw new Error(emailSubmitError)
              })
          })
          .catch(error => {
            throw new Error(error)
          })
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async getGoogleApiUrl () {
      try {
        /**
             * This scope tells google what information we want to request.
             */
        const DEFAULT_SCOPE = [
          'https://www.googleapis.com/auth/userinfo.profile',
          'https://www.googleapis.com/auth/userinfo.email'
        ]

        /**
             * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
             */
        function getConnectionUrl (auth) {
          return auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
            scope: DEFAULT_SCOPE
          })
        }

        /**
             * Create the google url to be sent to the client.
             */
        function urlGoogle () {
          const AUTH = createConnection() // this is from previous step
          return getConnectionUrl(AUTH)
        }

        const URL = urlGoogle()

        if (URL) {
          return { status: true, url: URL }
        } else {
          return { status: false }
        }
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async setClientPassword (req) {
      try {
        const SET_PASSWORD_FORM = {
          email: req.email,
          password: req.password,
          otpCode: req.otpCode,
          redisPrefix: 'Client-OTP-'
        }
        return AuthService.changeClientPassword(SET_PASSWORD_FORM)
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async resetClientPassword (req) {
      try {
        const SET_PASSWORD_FORM = {
          email: req.email,
          password: req.password,
          otpCode: req.otpCode,
          redisPrefix: 'Client-Passwd-Change-'
        }
        return AuthService.changeClientPassword(SET_PASSWORD_FORM)
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async changeClientPassword (req) {
      try {
        /* eslint-disable no-async-promise-executor */
        /* TODO: To remove the async in the promise below */
        return new Promise(async (resolve, reject) => {
          /* We are first checking redis to see whether it has a key that matches the given email */
          try {
            const REPLY = await REDIS_CLIENT.get(req.redisPrefix.concat(req.email))
            if (REPLY === req.otpCode) {
              const SET_PASSWORD_FORM = {
                email: req.email,
                password: req.password,
                intention: req.intention
              }
              await postDBRequest('users/v1/set_client_password', SET_PASSWORD_FORM)
                .then(async response => {
                  if (response.status && response.message === 'Password updated') {
                    await REDIS_CLIENT.del(req.redisPrefix.concat(req.email))
                  }
                  resolve(response)
                })
                .catch(error => {
                  throw new Error(error)
                })
            } else {
              resolve({ status: false, message: 'Invalid OTP Code' })
            }
          } catch (err) {
            // ClosedClient Error
            reject(err)
          }
        })
        /* eslint-enable no-async-promise-executor */
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async sendResetPasswordCode (req) {
      try {
        const CODE_PAYLOAD = {
          codeIntention: 'changing',
          intention: 'change',
          email: req.email,
          redisPrefix: 'Client-Passwd-Change-'
        }
        return AuthService.sendOTPCode(CODE_PAYLOAD)
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async resendOTPCode (req) {
      try {
        /* We are using this function when we want to set and change passwords.
            * That is the purpose of the intention/codeIntention and prefix variables
            * TODO: To reduce the three variables and use at most two of them for identification */
        let codeIntention, intention, prefix
        if (req.intention === 'set') {
          codeIntention = 'setting'
          intention = 'set'
          prefix = 'Client-OTP-'
        } else if (req.intention === 'change') {
          codeIntention = 'changing'
          intention = 'change'
          prefix = 'Client-Passwd-Change-'
        }
        const CODE_PAYLOAD = {
          codeIntention: codeIntention,
          intention: intention,
          email: req.email,
          redisPrefix: prefix
        }
        return AuthService.sendOTPCode(CODE_PAYLOAD)
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    /* Does the actual sending of the code */
    static async sendCode (req) {
      /* eslint-disable no-async-promise-executor */
      /* TODO: To remove the async in the promise below */
      return new Promise(async (resolve, reject) => {
        const RESPONSE = {
          accountExists: true,
          codeSent: false,
          message: null,
          shouldSetPass: true,
          type: 'Client',
          success: false
        }
        /* eslint-enable no-async-promise-executor */
        const OTP_CODE = AuthService.generateOTP()
        /* One key sets the email address while the other sets the token.
            * The email expires in 1 hour. The token however expires in 30 minutes.
            * TODO: To confirm reasoning behind the difference in the expiry times */
        await REDIS_CLIENT.set(req.redisPrefix.concat(req.email), OTP_CODE, { EX: 60 * 10, NX: false })
        await REDIS_CLIENT.set(req.redisPrefix.concat(req.email, '-token'), OTP_CODE, { EX: 30, NX: false })
        const HTML_TO_SEND = EMAIL_OTP.emailOTPCode(OTP_CODE, req.intention)
        const EMAIL_DETAILS = {
          to: req.email,
          subject: String(OTP_CODE).concat(' is the code to finish ', req.codeIntention, ' your password'),
          html: HTML_TO_SEND,
          info: false
        }
        await AuthService.sendEmail(EMAIL_DETAILS)
          .then(emailSentResponse => {
            if (emailSentResponse) {
              RESPONSE.success = true
              RESPONSE.message = 'A verification code has been sent to your email'
              RESPONSE.codeSent = true
              resolve(RESPONSE)
            } else {
              RESPONSE.codeSent = false
              RESPONSE.message = 'Failed to send email'
              resolve(RESPONSE)
            }
          })
          .catch(error => reject(error))
      })
    }

    /* Called to send the code, but does not do the actual sending */
    static async sendOTPCode (req) {
      try {
        return AuthService.postRequest('users/v1/web_user_by_email', { email: req.email })
          .then(user => {
            /* This functionality happens when a client wants to log in for the second time.
                    * That's why interest is only on clients not writers or even admins */
            if (user.type === 'Client') {
              /* eslint-disable no-async-promise-executor */
              /* TODO: To remove the async in the promise below */
              return new Promise(async (resolve, reject) => {
                try {
                  const OTP = await REDIS_CLIENT.get(req.redisPrefix.concat(req.email))
                  const RESPONSE = {
                    accountExists: true,
                    codeSent: false,
                    message: null,
                    shouldSetPass: true,
                    type: 'Client',
                    success: false
                  }
                  if (OTP) {
                    try {
                      const OTP_TOKEN = await REDIS_CLIENT.get(req.redisPrefix.concat(req.email, '-token'))
                      if (OTP_TOKEN) {
                        RESPONSE.success = true
                        RESPONSE.message = 'Code already sent. Kindly retry again after 30 seconds'
                        resolve(RESPONSE)
                      } else {
                        await REDIS_CLIENT.del(req.redisPrefix.concat(req.email))
                        resolve(AuthService.sendCode(req))
                      }
                    } catch (tokenErr) {
                      reject(tokenErr)
                    }
                  } else {
                    resolve(AuthService.sendCode(req))
                  }
                } catch (err) {
                  // ClosedClient Error
                  reject(err)
                }
              })
              /* eslint-enable no-async-promise-executor */
            } else {
              return {
                accountExists: true,
                codeSent: false,
                message: 'Failed to set password!',
                shouldSetPass: false,
                type: user.type,
                success: false
              }
            }
          })
          .catch(error => {
            throw new Error(error)
          })
      } catch (e) {
        return REQUESTS_MIXIN.customErrorMessage(e)
      }
    }

    static async getClientMobile (req) {
      const DECODED_TOKEN = await AuthService.decodeToken(req.headers.refresh)
      return await postDBRequest('users/v1/get_mobile', {
        email: DECODED_TOKEN.message.sub
      })
        .then(response => response)
        .catch(error => Promise.reject(error))
    }
}

module.exports = AuthService
