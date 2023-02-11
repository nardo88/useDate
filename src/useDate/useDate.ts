type Units = 'day' | 'month' | 'year'

export const useDate = (val?: number | Date) => {
  class DateInstanse {
    date: Date
    year: number = 0
    month: number = 0
    day: number = 0
    dayOfWeek: number = 0
    hour: number = 0
    minute: number = 0
    second: number = 0
    milisecond: number = 0

    constructor(val: number | Date | undefined) {
      this.date = val ? new Date(val) : new Date()
      this.init()
    }

    private init() {
      this.year = this.date.getFullYear()
      this.month = this.date.getMonth()
      this.day = this.date.getDate()
      this.dayOfWeek = this.date.getDay()
      this.hour = this.date.getHours()
      this.minute = this.date.getMinutes()
      this.second = this.date.getSeconds()
      this.milisecond = this.date.getMilliseconds()
    }

    valueof() {
      return this.date.getTime()
    }

    getDaysOfMoth() {
      return new Date(this.year, this.month + 1, 0).getDate()
    }

    startOf(unit: Units) {
      const date = new Date(this.date)
      date.setHours(0)
      date.setMinutes(0)
      date.setSeconds(0)
      switch (unit) {
        case 'day':
          return date
        case 'month':
          date.setDate(1)
          return date
        case 'year':
          date.setDate(1)
          date.setMonth(0)
          return date
      }
    }

    endOf(unit: Units) {
      const date = new Date(this.date)
      date.setHours(23, 59, 59, 999)
      switch (unit) {
        case 'day':
          return date
        case 'month':
          date.setDate(this.getDaysOfMoth())
          return date
        case 'year':
          date.setDate(31)
          date.setMonth(11)
          return date
      }
    }

    isSame(that: number | Date, units: Units) {
      const other = new Date(that).getTime()
      return (
        this.startOf(units).getTime() <= other &&
        other <= this.endOf(units).getTime()
      )
    }

    add(num: number, unit: Units) {
      switch (unit) {
        case 'day':
          this.date.setDate(this.day + num)
          break
        case 'month':
          this.date.setMonth(this.month + num)
          break
        case 'year':
          this.date.setFullYear(this.year + num)
          break
      }
      this.init()
      return this
    }
  }

  return new DateInstanse(val)
}
