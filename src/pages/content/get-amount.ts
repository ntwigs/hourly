import { isNumber } from '../../utils/is-number'
import { isString } from '../../utils/is-string'
import { Event } from '../../utils/storage'

export interface Amount {
  time?: string
  rate?: Event['rate']
  cost?: Event['cost']
}

export const getAmount = ({ time, rate, cost }: Amount): string => {
  if (!isString(time)) return ''
  if (!isNumber(rate)) return ''
  if (!isNumber(cost)) return ''

  const [hours, minutes, seconds] = time.split(':')
  const decimalHours = +hours + +minutes / 60 + +seconds / 3600

  const salary = +rate * decimalHours
  return (salary / +cost).toFixed(0)
}
