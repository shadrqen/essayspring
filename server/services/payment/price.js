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
        const COLLEGE_PERCENT_AS_DECIMAL = 1 - (priceRatio.bachelors / 100)
        const COLLEGE_PRICE = price * COLLEGE_PERCENT_AS_DECIMAL
        const SCHOOL_PERCENT_AS_DECIMAL = 1 - (priceRatio.college / 100)
        price = COLLEGE_PRICE * SCHOOL_PERCENT_AS_DECIMAL
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
        const MASTERS_AS_PERCENT = 1 + (priceRatio.masters / 100)
        const MASTERS_PRICE = price * MASTERS_AS_PERCENT
        const DOCTORATE_PERCENT_AS_DECIMAL = 1 + (priceRatio.doctorate / 100)
        price = MASTERS_PRICE * DOCTORATE_PERCENT_AS_DECIMAL
        break
      }
    }
    return price
  }

  /* The price reduces with an increase in the deadline becomes longer */
  static calculateByDeadline (initialPrice, deadline, priceRatio) {
    let price = initialPrice
    const DEADLINE_DAYS = deadline.days
    let hours = deadline.hours
    /* The variables below are divided into:
    *   - 12 hour
    *   - 1 day
    *   - 2 day
    *   - 3 day
    *   - 5-day
    * because the values stored in the database are in those denominations or else ranges */
    const _12HR_PERCENT_AS_DECIMAL = 1 - (priceRatio.hr12 / 100)
    const _12HR_PRICE = price * _12HR_PERCENT_AS_DECIMAL
    const _1DAY_PERCENT_AS_DECIMAL = 1 - (priceRatio.day1 / 100)
    const _1DAY_PRICE = _12HR_PRICE * _1DAY_PERCENT_AS_DECIMAL
    const _2DAY_PERCENT_AS_DECIMAL = 1 - (priceRatio.day2 / 100)
    const _2DAY_PRICE = _1DAY_PRICE * _2DAY_PERCENT_AS_DECIMAL
    const _3DAY_PERCENT_AS_DECIMAL = 1 - (priceRatio.day3 / 100)
    const _3DAY_PRICE = _2DAY_PRICE * _3DAY_PERCENT_AS_DECIMAL
    const _5DAY_PERCENT_AS_DECIMAL = 1 - (priceRatio.day5 / 100)
    const _5DAY_PRICE = _3DAY_PRICE * _5DAY_PERCENT_AS_DECIMAL
    /* TODO: To reduce the length of the calculations below */
    if (DEADLINE_DAYS >= 5) {
      price = _3DAY_PRICE * _5DAY_PERCENT_AS_DECIMAL
    } else if (DEADLINE_DAYS >= 3 && DEADLINE_DAYS < 5) {
      const PRICE_DIFF = _3DAY_PRICE - _5DAY_PRICE
      const PRICE_RED_PER_HR = PRICE_DIFF / 48
      if (DEADLINE_DAYS === 4) {
        hours = hours + 24
      }
      const TOTAL_PRICE_REDUCTION_PER_HR = hours * PRICE_RED_PER_HR
      price = _3DAY_PRICE - TOTAL_PRICE_REDUCTION_PER_HR
    } else if (DEADLINE_DAYS >= 2 && DEADLINE_DAYS < 3) {
      const PRICE_DIFF = _2DAY_PRICE - _3DAY_PRICE
      const PRICE_REDUCTION_PER_HR = PRICE_DIFF / 24
      const TOTAL_PRICE_REDUCTION_PER_HR = hours * PRICE_REDUCTION_PER_HR
      price = _2DAY_PRICE - TOTAL_PRICE_REDUCTION_PER_HR
    } else if (DEADLINE_DAYS >= 1 && DEADLINE_DAYS < 2) {
      const PRICE_DIFF = _1DAY_PRICE - _2DAY_PRICE
      const PRICE_REDUCTION_PER_HR = PRICE_DIFF / 24
      const TOTAL_PRICE_REDUCTION_PER_HR = hours * PRICE_REDUCTION_PER_HR
      price = _1DAY_PRICE - TOTAL_PRICE_REDUCTION_PER_HR
    } else if (DEADLINE_DAYS < 1) {
      if (hours !== 6) {
        if (hours <= 12) {
          const PRICE_DIFF = price - _12HR_PRICE
          const PRICE_REDUCTION_PER_HR = PRICE_DIFF / 6
          const TOTAL_PRICE_REDUCTION_PER_HR = (hours - 6) * PRICE_REDUCTION_PER_HR
          price = price - TOTAL_PRICE_REDUCTION_PER_HR
        } else {
          const PRICE_DIFF = _12HR_PRICE - _1DAY_PRICE
          const PRICE_REDUCTION_PER_HR = PRICE_DIFF / 12
          const TOTAL_PRICE_REDUCTION_PER_HR = (hours - 12) * PRICE_REDUCTION_PER_HR
          price = _12HR_PRICE - TOTAL_PRICE_REDUCTION_PER_HR
        }
      }
    }
    return price
  }

  /* Base function to return the price */
  static async calculatePrice (req, priceDetails) {
    const TIME_IN_24HRS = PricesService.convert12to24hr(req.deadlineTime)
    const ASSIGNMENT_DEADLINE = PricesService.calculateDeadlineInHoursDays(req.deadlineDate, TIME_IN_24HRS)
    let price = PricesService.calculateByStudyLevel(priceDetails.price.price, priceDetails.priceRatio, req.studyLevel)
    price = PricesService.calculateByDeadline(price, ASSIGNMENT_DEADLINE, priceDetails.priceRatio)
    price = price * req.pageCount
    return {
      basePrice: price,
      discount: priceDetails.discount ? priceDetails.discount.discount : '0',
      currencyCode: priceDetails.price.Currency.currencyCode || 'KES'
    }
  }

  /* Gets the stored price ranges from the database and then calculate the price from the function above */
  static async getPrice (req) {
    const PRICE_RATIO = {
      assignmentType: req.assignmentType,
      serviceType: req.serviceType,
      pageCount: req.pageCount
    }
    return await postDBRequest('payments/v1/price_ratio', PRICE_RATIO)
      .then(async priceDetails => {
        return await this.calculatePrice(req, priceDetails)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }

  static convert12to24hr (targetDeadlineTime) {
    const AM_PM_LENGTH = targetDeadlineTime.length
    let amPm, timeIn24Hrs
    if (AM_PM_LENGTH === 3) {
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
    const TODAY = new Date()
    const ULTIMATE_DEADLINE = new Date(deadlineDate)
    ULTIMATE_DEADLINE.setHours(deadlineTime)
    const DIFFERENCE_TIME = ULTIMATE_DEADLINE.getTime() - TODAY.getTime()
    const DIFFERENCE_DAYS = DIFFERENCE_TIME / (1000 * 3600 * 24)
    const REMAINING_DAYS = Math.floor(DIFFERENCE_DAYS)
    const REMAINING_HOURS = Math.floor((DIFFERENCE_DAYS % 1) * 24)
    return { days: REMAINING_DAYS, hours: REMAINING_HOURS }
  }
}

module.exports = PricesService
