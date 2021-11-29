import { isNumber } from '../../utils/is-number'
import { isString } from '../../utils/is-string'
import { Event } from '../../utils/storage'

export interface Amount {
  time?: string
  rate?: Event['rate']
  cost?: Event['cost']
}

export interface AmountResponse {
  items: string
  percentage: number
}

const defaultAmount = {
  items: '0',
  percentage: 0,
}

export const getAmount = ({ time, rate, cost }: Amount): AmountResponse => {
  if (!isString(time)) return defaultAmount
  if (!isNumber(rate)) return defaultAmount
  if (!isNumber(cost)) return defaultAmount

  const [hours, minutes, seconds] = time.split(':')
  const decimalHours = +hours + +minutes / 60 + +seconds / 3600

  const salary = +rate * decimalHours
  const amount = salary / +cost
  const [items, decimal] = `${amount.toFixed(1)}`.split('.')

  return {
    items: isNumber(items) ? items : '0',
    percentage: isNumber(decimal) ? decimal * 10 : 0,
  }
}
