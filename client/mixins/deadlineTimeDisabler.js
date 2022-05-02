import Time from '@/utils/time'
export default {
  methods: {
    /* The minimum selectable deadline for any job is 6 hours.
* This means that should a user want to place an order at 8am, the earliest deadline should not be earlier
* than 2pm. Therefore, we need to disable the time between 12am to 2pm. This is considering that we can't
* also select a time that is later than 8am.
* This is what the function below does. */
    disablePossibleDeadlineTimes () {
      const DATE_TIME = new Time.DateTime()
      if (this.clientPostOrderForm.deadlineDate) {
        const time = DATE_TIME._time
        const CURRENT_REFINED_TIME = String(time.split(' ')[0].split(':')[0]).concat(time.split(' ')[1])
        const INDEX_OF_CURRENT_TIME = this.time.filter(time__ => time__.time === CURRENT_REFINED_TIME)[0]
        if (this.clientPostOrderForm.deadlineDate === DATE_TIME._date) {
          const maximumAllowedTimeIds = INDEX_OF_CURRENT_TIME.id + 6 > 24 ? 24 : INDEX_OF_CURRENT_TIME.id + 6
          this.disabledTimes = this.time.filter(time__ => time__.id <= maximumAllowedTimeIds)
          const selectedTimeIsDisabled = this.time.filter(time__ => time__.id === this.clientPostOrderForm.deadlineTime)
          if (selectedTimeIsDisabled.length > 0) {
            this.clientPostOrderForm.deadlineTime = ''
          }
        } else if (this.clientPostOrderForm.deadlineDate === DATE_TIME.tomorrow) {
          if (DATE_TIME.currentHr >= 18) {
            const TIME_DIFF_TO_MIDNIGHT = DATE_TIME.currentHr - 17
            this.disabledTimes = this.time.filter(time__ => time__.id <= TIME_DIFF_TO_MIDNIGHT)
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
