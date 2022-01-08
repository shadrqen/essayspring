/* Service that is supposed to handle logging requests.
* However, the function is currently being done through the backend
* microservices from the two applications. There is a similar service that
* picks the requests, then sends the logs to the dbms for saving.
* The functionality of this service will be included in future versions */

class LoggerService {
  static logger (req, res, next) {
    // console.log(req.headers)
    next()
  }
}

module.exports = LoggerService
