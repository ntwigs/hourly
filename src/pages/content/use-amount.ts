import { useMemo } from 'react'
import { getAmount, Amount, AmountResponse } from './get-amount'

export const useAmount = ({ time, rate, cost }: Amount): AmountResponse => {
  const amount = useMemo(
    () => getAmount({ time, rate, cost }),
    [time, rate, cost]
  )
  return amount
}
