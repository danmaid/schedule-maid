type DateOptions = {
  year?: number
  month?: number
  date?: number
  hours?: number
  minutes?: number
  seconds?: number
  ms?: number
  day?: number
}

export type ComputedDateOptions = { fixed?: DateOptions & { time?: 0 }; offset?: Omit<DateOptions, 'day'> }
export function isComputedDateOptions(v: any): v is ComputedDateOptions {
  if (typeof v !== 'object') return false
  if ('fixed' in v) return true
  if ('offset' in v) return true
  return false
}

export class ComputedDate extends Date {
  constructor(options: ComputedDateOptions, ...args: ConstructorParameters<DateConstructor>) {
    super(...args)
    if (options.fixed) this.fix(options.fixed)
    if (options.offset) this.offset(options.offset)
  }

  fix(options: DateOptions & { time?: 0 }) {
    const { year, month, date, hours, minutes, seconds, ms, day, time } = options
    if (time !== undefined) this.setHours(0, 0, 0, 0)
    if (year !== undefined) this.setFullYear(year)
    if (month !== undefined) this.setMonth(month)
    if (date !== undefined) this.setDate(date)
    if (hours !== undefined) this.setHours(hours)
    if (minutes !== undefined) this.setMinutes(minutes)
    if (seconds !== undefined) this.setSeconds(seconds)
    if (ms !== undefined) this.setMilliseconds(ms)
    if (day !== undefined) this.setDate(this.getDate() - this.getDay() + day)
  }

  offset(options: Omit<DateOptions, 'day'>) {
    const { year, month, date, hours, minutes, seconds, ms } = options
    if (year !== undefined) this.setFullYear(this.getFullYear() + year)
    if (month !== undefined) this.setMonth(this.getMonth() + month)
    if (date !== undefined) this.setDate(this.getDate() + date)
    if (hours !== undefined) this.setHours(this.getHours() + hours)
    if (minutes !== undefined) this.setMinutes(this.getMinutes() + minutes)
    if (seconds !== undefined) this.setSeconds(this.getSeconds() + seconds)
    if (ms !== undefined) this.setMilliseconds(this.getMilliseconds() + ms)
  }
}
