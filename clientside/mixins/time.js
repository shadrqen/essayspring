class TimeMixin {
  /* Function that returns the remaining days and hours before a given deadline lapses.
  * The use of the static function allows us to access it without instantiating it */
  static deadline (deadlineDate, deadlineTime) {
    /* If the date and time are set */
    if (deadlineDate && deadlineTime !== null && deadlineTime !== '') {
      /* Get the current date.
      * FIXME: Get the date from the back-end so as to remove discrepancies in the client dates */
      const today = new Date()
      const ultimateDeadline = new Date(deadlineDate)
      ultimateDeadline.setHours(deadlineTime)
      const differenceTime = ultimateDeadline.getTime() - today.getTime()
      const differenceDays = differenceTime / (1000 * 3600 * 24)
      const remainingDays = Math.floor(differenceDays)
      const remainingHours = Math.floor((differenceDays % 1) * 24)
      return { days: remainingDays, hours: remainingHours }
    } else {
      /* Otherwise return null */
      return null
    }
  }

  /* Returns the time in 24 hours
  * TODO: To integrate a module to do this */
  static deadlineHoursAmPm (targetDeadlineTime) {
    /* Takes time in AM/PM and returns it in 24 hours
    * e.g. 4PM and returns 16 */
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
}

module.exports = TimeMixin
