'use strict'

const axios = require('axios')

const getDBRequest = require('../database/connect').getDBRequest
const postDBRequest = require('../database/connect').postDBRequest

const requestsMixin = require('../../mixins/requests')

const {decodeToken, sendEmail} = require('../users/auth')

const sockets = require('../sockets/order')

const orderEmailAction = require('../../views/order_email_action')

const newWriterRegistration = require('../../views/new_writer_registration')

// const writerOrderEmailAction = require('../../views/writer_email_action')

const fs = require('fs')

class OrdersService {

    /*TODO: To make one custom function that receives a DBMS url and makes the request before returning the response
* so as to make it reusable */

    static async getDisciplines() {
        return await getDBRequest('orders/v1/disciplines')
            .then(disciplines => disciplines)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getAssignmentTypes() {
        return await getDBRequest('orders/v1/assignment_types')
            .then(types => types)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getOrderServiceTypes(req) {
        return await postDBRequest('orders/v1/order_service_types', {extra: req.extra})
            .then(types => types)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static getCitationStyles = async () => {
        return await getDBRequest('orders/v1/citation_styles')
            .then(styles => styles)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static getOrderFormats = async () => {
        return await getDBRequest('orders/v1/order_formats')
            .then(formats => formats)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static getAcademicCertifications = async () => {
        return await getDBRequest('orders/v1/academic_certifications')
            .then(certifications => certifications)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static getTime = async () => {
        return await getDBRequest('orders/v1/time')
            .then(time => time)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getEducationLevels(req) {
        return await postDBRequest('orders/v1/education_levels',
            {
                academicInclined: req.academicInclined,
                orderInclined: req.orderInclined
            })
            .then(levels => levels)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getOrderBids(req) {
        /* TODO: To confirm why an array was sent as 'first' */
        await sockets.getBids(req.orderId, true)
        return {connectionStarted: true}
    }

    /*Sends public/private writers notifications on email that there is a new order*/
    static async sendWriterNotifications(response, orderId, type) {
        if (response === 'success') {
            let origin = process.env.NODE_ENV === 'production' ? process.env.WR_APP_URL : `http://${process.env.WR_URL}:82`
            let url = type === 'public' ? 'new_order' : 'private/new_order'
            await axios.post(origin.concat('/orders/notifications/email/ws/'.concat(url)), {
                orderId: orderId,
                wr_x_api_key: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? process.env.WR_NEW_BID_SECRET : process.env.DEV_WR_NEW_BID_SECRET
            })
                /*TODO: To handle the responses below*/
                .then(res => {
                })
                .catch(err => {
                })
        }
    }

    /*Once a writer invitation has been saved on the database after being initiated by the client,
    * there is now need to send an email notification to the writer */
    static async sendWriterClientInvitation(response, req) {
        if (response.message === 'Invitation sent successfully' || response.message === 'Invitation already exists!') {
            const decodedToken = await decodeToken(req.headers.access)
            let url = process.env.NODE_ENV === 'production' ? process.env.WR_APP_URL : `http://${process.env.WR_URL}:82`
            await axios.post(url.concat('/orders/notifications/email/ws/client_invitation'), {
                clientEmail: decodedToken.message.sub,
                writerEmail: req.body.email,
                wr_x_api_key: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? process.env.WR_NEW_BID_SECRET : process.env.DEV_WR_NEW_BID_SECRET
            })
                .then(res => {
                    console.log('\n\n\n response: ', res.data, '\n\n\n')
                })
                .catch(err => {
                    console.log('\n\n\n error: ', err.data, '\n\n\n')
                })
        }
    }

    static saveOrderDetails = async req => {
        return await postDBRequest('orders/v1/save_order_details', req)
            .then(async res => res)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static saveOrderPaymentDetails = async req => {
        return await postDBRequest('orders/v1/save_order_payment_details', req)
            .then(res => res)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static removeFile = async req => {
        return await postDBRequest('orders/v1/remove_file', req)
            .then(res => res)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static updateOrderStatus = async req => {
        return await postDBRequest('orders/v1/update_order_status', req)
            .then(res => res)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getOrderStatusTypes() {
        return await getDBRequest('orders/v1/get_order_status_types')
            .then(response => response)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getOrders(req) {
        const decodedToken = await decodeToken(req.headers.access)
        const form = {}
        const multiple = req.body.multiple
        form.multiple = multiple
        form.email = decodedToken.message.sub
        if (multiple) {
            form.orderStatusID = req.body.orderStatusID
        } else {
            form.orderId = req.body.orderId
        }
        return await postDBRequest('orders/v1/get_orders', form)
            .then(response => response)
            .catch(error => requestsMixin.customErrorMessage(error))
    }

    static async getFile(req) {
        let uploadsPath
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
            /*This is a directory inside our docker instance that is mapped to a volume on the host device*/
            uploadsPath = '/static/uploads/'
        } else {
            /*We need to have a directory called static/ws/uploads just outside the root of the project
            * This is on development*/
            uploadsPath = __dirname.concat('/../../../static/ws/uploads/')
        }
        try {
            // const fileExtension = req.fileUrl.split('.').pop()
            const data = fs.readFileSync(uploadsPath.concat(req.fileUrl), 'base64')
            return {message: 'success', file: data}
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }

    static async getOrderDetails(req) {
        try {
            const decodedToken = await decodeToken(req.headers.access)
            return await postDBRequest('orders/v1/get_order_details', {
                email: decodedToken.message.sub,
                orderId: req.body.orderId
            })
                .then(detail => detail)
                .catch(error => {
                    throw new Error(error)
                })
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }

    /*TODO: To make the use of try consistent */
    static async confirmOrderBelongs2Client(req) {
        try {
            const decodedToken = await decodeToken(req.headers.access)
            return await postDBRequest('orders/v1/confirm_order_ownership', {
                orderId: req.body.orderId,
                email: decodedToken.message.sub
            })
                .then(response => response)
                .catch(error => {
                    throw new Error(error)
                })
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }

    static async requestOrderRevision(req) {
        try {
            const decodedToken = await decodeToken(req.headers.access)
            const orderId = req.body.orderId
            return await postDBRequest('orders/v1/revision_request', {
                orderId: orderId,
                email: decodedToken.message.sub,
                supportingFiles: req.body.supportingFiles,
                checklist: req.body.checklist,
                deadline: req.body.deadline
            })
                .then(response => {
                    const msg = 'there is a revision request for order No. ' + orderId + '!'
                    OrdersService.requestWsWriterSendEmail(orderId, msg, 'revision')
                    return response
                })
                .catch(error => {
                    throw new Error(error)
                })
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }

    static async confirmOrderCompletion(req) {
        try {
            const decodedToken = await decodeToken(req.headers.access)
            const orderId = req.body.orderId
            const email = decodedToken.message.sub
            return await postDBRequest('orders/v1/confirm_order_completion', {
                orderId: orderId,
                email: email
            })
                .then(response => {
                    const msg = 'order No. ' + orderId + ' has been confirmed!'
                    OrdersService.requestWsWriterSendEmail(orderId, msg, 'order-update')
                    return response
                })
                .catch(error => {
                    throw new Error(error)
                })
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }

    /*In case of an issue with an order such as a revision or completion from the client's side,
    * we need to notify the writer*/
    static requestWsWriterSendEmail(orderId, msg, purpose) {
        let host, key
        if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
            key = process.env.WR_NEW_BID_SECRET
            host = process.env.WR_APP_URL
        } else {
            key = process.env.DEV_WR_NEW_BID_SECRET
            host = `http://${process.env.WR_URL}:82`
        }
        /*The host above refers to the Writeray app micro-service. It is responsible for handling things such as
        * sending email notifications since it sits on the same origin as the email server*/
        let url
        if (purpose === 'revision') {
            url = host + '/orders/notifications/email/ws/order_revision'
        } else {
            url = host + '/orders/notifications/email/ws/writer_specific'
        }
        const notificationPayload = {
            orderId: orderId,
            msg: msg,
            wr_x_api_key: key /*This is the key that is used for inter-service communication*/
        }
        /*To handle the responses below*/
        axios.post(url, notificationPayload)
            .then(() => {
            })
            .catch(() => {
            })
    }

    /*Sends order email notifications to clients*/
    static async emailNotification(req) {
        try {
            const email = req.email
            const msg = req.msg
            const user = req.user
            const orderId = req.order_id
            let url
            if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
                url = 'https://essayspring.com/orders'
            } else {
                url = `http://${process.env.URL}:4100/orders`
            }
            const htmlToSend = orderEmailAction.orderAction(orderId, msg, user, url)
            const emailDetails = {
                to: email,
                subject: 'Order Status Update',
                html: htmlToSend
            }
            await sendEmail(emailDetails)
        } catch (err) {
            console.log(requestsMixin.customErrorMessage(err))
        }
    }

    /*A client has the ability to invite his private writers.
    * Once the invited writer registers successfully under this client, we notify the client
    * of the same*/
    static async personWriterRegistersEmailNotification(req) {
        try {
            const email = req.email
            const names = req.names
            let url
            if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
                url = 'https://essayspring.com/client/writers'
            } else {
                url = `http://${process.env.URL}:4100/client/writers`
            }
            const htmlToSend = newWriterRegistration.newWriterRegistration(names, url)
            const emailDetails = {
                to: email,
                subject: 'New Writer Registration',
                html: htmlToSend
            }
            await sendEmail(emailDetails)
            return {success: true}
        } catch (err) {
            return Promise.reject(requestsMixin.customErrorMessage(err))
        }
    }

    static async rateWriter(req) {
        return await postDBRequest('orders/v1/rate_writer', {
            orderId: req.orderId,
            rating: req.rating
        })
            .then(response => {
                return {rated: response}
            })
            .catch(error => {
                return requestsMixin.customErrorMessage(error)
            })
    }

    static async getPersonalWriters(req) {
        try {
            const decodedToken = await decodeToken(req.headers.access)
            const email = decodedToken.message.sub
            return await postDBRequest('orders/v1/get_personal_writers', {
                email: email
            })
                .then(response => response)
                .catch(error => requestsMixin.customErrorMessage(error))
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }

    static async sendWriterInvite(req) {
        try {
            const decodedToken = await decodeToken(req.headers.access)
            const email = decodedToken.message.sub
            return await postDBRequest('orders/v1/send_writer_invite', {
                email: email,
                writerEmail: req.body.email
            })
                .then(response => response)
                .catch(error => requestsMixin.customErrorMessage(error))
        } catch (err) {
            return requestsMixin.customErrorMessage(err)
        }
    }
}

module.exports = OrdersService
