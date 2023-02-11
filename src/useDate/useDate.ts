type Units = 'day' | 'month' | 'year'

type matchType =
  | 'YY'
  | 'YYYY'
  | 'M'
  | 'MM'
  | 'MMMM'
  | 'D'
  | 'DD'
  | 'd'
  | 'dd'
  | 'H'
  | 'HH'
  | 'h'
  | 'hh'
  | 'm'
  | 'mm'
  | 's'
  | 'ss'

const utils = {
  addZero(num: number) {
    if (String(num + 1).length === 1) {
      return `0${num + 1}`
    }
    return String(num + 1)
  },
  monthNames: {
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    ru: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
  },
  dayOfWeek: {
    ru: [
      'Воскресение',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
  },
  REGEX_FORMAT:
    /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
  FORMAT_DEFAULT: 'YYYY-MM-DD HH:mm',
}
export class IDateInst {
  private _date: Date
  private _year: number = 0
  private _month: number = 0
  private _day: number = 0
  private _dayOfWeek: number = 0
  private _hours: number = 0
  private _minutes: number = 0
  private _seconds: number = 0
  private _miliseconds: number = 0
  private _local: 'en' | 'ru' = 'ru'

  constructor(val: number | Date | undefined, local?: 'ru' | 'en') {
    this._date = val ? new Date(val) : new Date()
    if (local) {
      this._local = local
    }
    this.init()
  }

  private init() {
    this._year = this._date.getFullYear()
    this._month = this._date.getMonth()
    this._day = this._date.getDate()
    this._dayOfWeek = this._date.getDay()
    this._hours = this._date.getHours()
    this._minutes = this._date.getMinutes()
    this._seconds = this._date.getSeconds()
    this._miliseconds = this._date.getMilliseconds()
  }

  get dayOfWeek() {
    return this._dayOfWeek
  }

  get year() {
    return this._year
  }

  get month() {
    return this._month
  }
  get day() {
    return this._day
  }
  get hours() {
    return this._hours
  }
  get minutes() {
    return this._minutes
  }
  get seconds() {
    return this._seconds
  }
  get miliseconds() {
    return this._miliseconds
  }

  valueof() {
    return this._date.getTime()
  }

  getDaysOfMoth() {
    return new Date(this._year, this._month + 1, 0).getDate()
  }

  startOf(unit: Units) {
    const date = new Date(this._date)
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
    const date = new Date(this._date)
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
        this._date.setDate(this._day + num)
        break
      case 'month':
        this._date.setMonth(this._month + num)
        break
      case 'year':
        this._date.setFullYear(this._year + num)
        break
    }
    this.init()
    return this
  }

  unix() {
    return Math.floor(this._date.valueOf() / 1000)
  }

  format(format?: string) {
    const str = format || utils.FORMAT_DEFAULT
    const matches = {
      // год 23
      YY: String(this._year).slice(-2),
      // год 2023
      YYYY: String(this._year),
      // month 1-12
      M: String(this._month + 1),
      // month 01-12
      MM: utils.addZero(this._month),
      // January - December
      MMMM: utils.monthNames[this._local][this._month],
      // 1-31 (число месяца)
      D: String(this._day),
      // 01-31 (число месяца)
      DD: utils.addZero(this._day),
      // 1-6 (день недели)
      d: String(this._dayOfWeek),
      // Sunday - Saturday
      dd: utils.dayOfWeek[this._local][this._day],
      // 0-23 (часы)
      H: String(this._hours),
      // 00-23 (часы)
      HH: utils.addZero(this._hours),
      // 0-12 (часы)
      h: String(this._hours % 12 || 12),
      // 00-12 (часы)
      hh: utils.addZero(this._hours % 12 || 12),
      // 0-59 (минуты)
      m: String(this._minutes),
      // 00-59 (минуты)
      mm: utils.addZero(this._minutes),
      // 0-59 (секунды)
      s: String(this._seconds),
      // 00-59 (секунды)
      ss: utils.addZero(this._seconds),
    }
    // @ts-ignore
    return str.replace(utils.REGEX_FORMAT, (match: any) => matches[match])
  }
}

export type IDate = (val?: number | Date) => IDateInst

export const useDate = (local?: 'ru' | 'en') => (val?: number | Date) => {
  return new IDateInst(val, local)
}
