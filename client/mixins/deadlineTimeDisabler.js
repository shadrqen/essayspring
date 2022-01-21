import Time from '@/utils/time'
export default {
  methods: {
    /* The minimum selectable deadline for any job is 6 hours.
* This means that should a user want to place an order at 8am, the earliest deadline should not be earlier
* than 2pm. Therefore, we need to disable the time between 12am to 2pm. This is considering that we can't
* also select a time that is later than 8am.
* This is what the function below does. */
    disablePossibleDeadlineTimes () {
      const dateTime = new Time.DateTime()
      if (this.clientPostOrderForm.deadlineDate) {
        const time = dateTime._time
        const currentRefinedTime = String(time.split(' ')[0].split(':')[0]).concat(time.split(' ')[1])
        const indexOfCurrentTime = this.time.filter(time__ => time__.time === currentRefinedTime)[0]
        if (this.clientPostOrderForm.deadlineDate === dateTime._date) {
          const maximumAllowedTimeIds = indexOfCurrentTime.id + 6 > 24 ? 24 : indexOfCurrentTime.id + 6
          this.disabledTimes = this.time.filter(time__ => time__.id <= maximumAllowedTimeIds)
          const selectedTimeIsDisabled = this.time.filter(time__ => time__.id === this.clientPostOrderForm.deadlineTime)
          if (selectedTimeIsDisabled.length > 0) {
            this.clientPostOrderForm.deadlineTime = ''
          }
        } else if (this.clientPostOrderForm.deadlineDate === dateTime.tomorrow) {
          if (dateTime.currentHr >= 18) {
            const timeDiffToMidnight = dateTime.currentHr - 17
            this.disabledTimes = this.time.filter(time__ => time__.id <= timeDiffToMidnight)
          } else {
            this.disabledTimes = []
          }
        } else {
          this.disabledTimes = []
        }
      } else {
        this.disabledTimes = []
      }
    }
  }
}
