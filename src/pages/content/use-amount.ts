import { useMemo } from 'react'
import { getAmount, Amount } from './get-amount'

export const useAmount = ({ time, rate, cost }: Amount): string => {
  const amount = useMemo(
    () => getAmount({ time, rate, cost }),
    [time, rate, cost]
  )
  return amount
}
