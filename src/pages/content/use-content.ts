import { useStorageState } from '../../hooks/use-storage-state'
import { useTimeObserver } from './use-time-observer'
import { useOnMessage } from './use-on-message'
import { Event } from '../../utils/storage'
import { useAmount } from './use-amount'

export interface Props {
  timeObserver: (fn: MutationCallback) => MutationObserver
  defaultTime?: string
  isTimer?: boolean
}

export const useContent = ({
  timeObserver,
  defaultTime = '',
}: Pick<Props, 'timeObserver' | 'defaultTime'>) => {
  const [rate, setRate] = useStorageState<Event['rate']>({ selector: 'rate' })
  const [cost, setCost] = useStorageState<Event['cost']>({ selector: 'cost' })
  const [item, setItem] = useStorageState<Event['selection']>({
    selector: 'selection',
  })
  const time = useTimeObserver({ defaultTime, timeObserver })
  const { items, percentage } = useAmount({ time, rate, cost })

  useOnMessage({ item, setItem, setRate, setCost })

  return { items, percentage, item }
}
