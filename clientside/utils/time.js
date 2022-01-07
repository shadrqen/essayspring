/* FIXME: To get time from the backend */
class DateTime {
  constructor () {
    // this._date = moment().format('L')
    // this._time = moment().format('LT')
    this.currentDate = new Date()
    this.today = new Date()
    this._time = this.formatAMPM(this.currentDate)
    this.currentHr = this.currentDate.getHours()
    const hour24Hr = [this.currentDate.getHours(), this.currentDate.getMinutes()]
    this.time24Hr = hour24Hr.join(':')
    const date = [this.currentDate.getFullYear(), this.formatInt(this.currentDate.getMonth() + 1), this.formatInt(this.currentDate.getDate())]
    this._date = date.join('-')
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    const tomorrowArray = [tomorrow.getFullYear(), this.formatInt(tomorrow.getMonth() + 1), this.formatInt(tomorrow.getDate())]
    this.tomorrow = tomorrowArray.join('-')
  }

  formatInt (num) {
    if (num < 10) {
      return '0'.concat(String(num))
    } else {
      return num
    }
  }

  formatAMPM (date) {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours !== 0 ? hours : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes
    return hours + ':' + minutes + ' ' + ampm
  }

  date () {
    return this._date
  }

  time () {
    return this._time
  }
}

export default {
  DateTime
}
