const { postDBRequest } = require('../database/connect')

/* Handles the issue of order paper prices */

class PricesService {
  /* The cost of an order increases as study levels go up */
  static calculateByStudyLevel (_price, priceRatio, studyLevel) {
    let price = _price
    let percentageAsDecimal = 1
    switch (studyLevel) {
      case 'High School':
      {
        const collegePercentAsDecimal = 1 - (priceRatio.bachelors / 100)
        const collegePrice = price * collegePercentAsDecimal
        const schoolPercentageAsDecimal = 1 - (priceRatio.college / 100)
        price = collegePrice * schoolPercentageAsDecimal
        break
      }
      case 'College':
      {
        percentageAsDecimal = 1 - (priceRatio.bachelors / 100)
        price = price * percentageAsDecimal
        break
      }
      /* The reason why we skip bachelors is because it is the default base price upon which others
      * are derived from. Therefore, we just go ahead and return the base price without further
      * calculcations. */
      case 'Bachelor\'s':
        break
      case 'Master\'s':
      {
        percentageAsDecimal = 1 + (priceRatio.masters / 100)
        price = price * percentageAsDecimal
        break
      }
      case 'Doctorate':
      {
        const mastersPercentAsDecimal = 1 + (priceRatio.masters / 100)
        const mastersPrice = price * mastersPercentAsDecimal
        const doctoratePercentAsDecimal = 1 + (priceRatio.doctorate / 100)
        price = mastersPrice * doctoratePercentAsDecimal
        break
      }
    }
    return price
  }

  /* The price reduces with an increase in the deadline becomes longer */
  static calculateByDeadline (initialPrice, deadline, priceRatio) {
    let price = initialPrice
    const days = deadline.days
    let hours = deadline.hours
    /* The variables below are divided into:
    *   - 12 hour
    *   - 1 day
    *   - 2 day
    *   - 3 day
    *   - 5-day
    * because the values stored in the database are in those denominations or else ranges */
    const _12hrPercentageAsDecimal = 1 - (priceRatio.hr12 / 100)
    const _12hrPrice = price * _12hrPercentageAsDecimal
    const _1dayPercentAsDecimal = 1 - (priceRatio.day1 / 100)
    const _1dayPrice = _12hrPrice * _1dayPercentAsDecimal
    const _2dayPercentAsDecimal = 1 - (priceRatio.day2 / 100)
    const _2dayPrice = _1dayPrice * _2dayPercentAsDecimal
    const _3dayPercentAsDecimal = 1 - (priceRatio.day3 / 100)
    const _3dayPrice = _2dayPrice * _3dayPercentAsDecimal
    const _5dayPercentAsDecimal = 1 - (priceRatio.day5 / 100)
    const _5dayPrice = _3dayPrice * _5dayPercentAsDecimal
    /* TODO: To reduce the length of the calculations below */
    if (days >= 5) {
      price = _3dayPrice * _5dayPercentAsDecimal
    } else if (days >= 3 && days < 5) {
      const priceDiff = _3dayPrice - _5dayPrice
      const priceRedPerHr = priceDiff / 48
      if (days === 4) {
        hours = hours + 24
      }
      const totalPriceRed = hours * priceRedPerHr
      price = _3dayPrice - totalPriceRed
    } else if (days >= 2 && days < 3) {
      const priceDiff = _2dayPrice - _3dayPrice
      const priceRedPerHr = priceDiff / 24
      const totalPriceRed = hours * priceRedPerHr
      price = _2dayPrice - totalPriceRed
    } else if (days >= 1 && days < 2) {
      const priceDiff = _1dayPrice - _2dayPrice
      const priceRedPerHr = priceDiff / 24
      const totalPriceRed = hours * priceRedPerHr
      price = _1dayPrice - totalPriceRed
    } else if (days < 1) {
      if (hours !== 6) {
        if (hours <= 12) {
          const priceDiff = price - _12hrPrice
          const priceRedPerHr = priceDiff / 6
          const totalPriceRed = (hours - 6) * priceRedPerHr
          price = price - totalPriceRed
        } else {
          const priceDiff = _12hrPrice - _1dayPrice
          const priceRedPerHr = priceDiff / 12
          const totalPriceRed = (hours - 12) * priceRedPerHr
          price = _12hrPrice - totalPriceRed
        }
      }
    }
    return price
  }

  /* Base function to return the price */
  static async calculatePrice (req, priceDetails) {
    const timeIn24Hr = PricesService.convert12to24hr(req.deadlineTime)
    const deadline = PricesService.calculateDeadlineInHoursDays(req.deadlineDate, timeIn24Hr)
    let price = PricesService.calculateByStudyLevel(priceDetails.price.price, priceDetails.priceRatio, req.studyLevel)
    price = PricesService.calculateByDeadline(price, deadline, priceDetails.priceRatio)
    price = price * req.pageCount
    return {
      basePrice: price,
      discount: priceDetails.discount ? priceDetails.discount.discount : '0',
      currencyCode: priceDetails.price.Currency.currencyCode || 'KES'
    }
  }

  /* Gets the stored price ranges from the database and then calculate the price from the function above */
  static async getPrice (req) {
    const priceRatioObj = {
      assignmentType: req.assignmentType,
      serviceType: req.serviceType,
      pageCount: req.pageCount
    }
    return await postDBRequest('payments/v1/price_ratio', priceRatioObj)
      .then(async priceDetails => {
        return await this.calculatePrice(req, priceDetails)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  static convert12to24hr (targetDeadlineTime) {
    const amPmLength = targetDeadlineTime.length
    let amPm, timeIn24Hrs
    if (amPmLength === 3) {
      amPm = targetDeadlineTime.slice(1)
      if (amPm === 'PM') {
        timeIn24Hrs = Number(targetDeadlineTime[0]) + 12
      } else {
        timeIn24Hrs = targetDeadlineTime[0]
      }
    } else {
      amPm = targetDeadlineTime.slice(2)
      if (amPm === 'PM') {
        if (Number(targetDeadlineTime.slice(0, 2)) === 12) {
          timeIn24Hrs = 12
        } else {
          timeIn24Hrs = Number(targetDeadlineTime.slice(0, 2)) + 12
        }
      } else {
        if (Number(targetDeadlineTime.slice(0, 2)) === 12) {
          timeIn24Hrs = 0
        } else {
          timeIn24Hrs = targetDeadlineTime.slice(0, 2)
        }
      }
    }
    return timeIn24Hrs
  }

  static calculateDeadlineInHoursDays (deadlineDate, deadlineTime) {
    const today = new Date()
    const ultimateDeadline = new Date(deadlineDate)
    ultimateDeadline.setHours(deadlineTime)
    const differenceTime = ultimateDeadline.getTime() - today.getTime()
    const differenceDays = differenceTime / (1000 * 3600 * 24)
    const remainingDays = Math.floor(differenceDays)
    const remainingHours = Math.floor((differenceDays % 1) * 24)
    return { days: remainingDays, hours: remainingHours }
  }
}

module.exports = PricesService
