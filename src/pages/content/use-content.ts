import { useStorageState } from '../../hooks/use-storage-state'
import { useTimeObserver } from './use-time-observer'
import { useOnMessage } from './use-on-message'
import { Event } from '../../utils/storage'
import { useAmount } from './use-amount'
import { items as defaultItems } from '../../data/items'

export interface Props {
  timeObserver: (fn: MutationCallback) => MutationObserver
  defaultTime?: string
  isTimer?: boolean
}

export const useContent = ({
  timeObserver,
  defaultTime = '',
}: Pick<Props, 'timeObserver' | 'defaultTime'>) => {
  const [rate, setRate] = useStorageState<Event['rate']>({
    selector: 'rate',
    defaultValue: '100',
  })
  const [cost, setCost] = useStorageState<Event['cost']>({
    selector: 'cost',
    defaultValue: '10',
  })
  const [item, setItem] = useStorageState<Event['selection']>({
    selector: 'selection',
    defaultValue: defaultItems[0],
  })

  const time = useTimeObserver({ defaultTime, timeObserver })
  const { items, percentage } = useAmount({ time, rate, cost })

  useOnMessage({ item, setItem, setRate, setCost })

  return { items, percentage, item }
}
