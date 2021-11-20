import { motion, Variants } from 'framer-motion'
import { useTheme } from 'styled-components'
import { ContentIcon } from '../../components/content-icon'
import { Icon } from '../../components/icons'
import { useStorageState } from '../../hooks/use-storage-state'
import { useTimeObserver } from './use-time-observer'
import { useOnMessage } from './use-on-message'
import { Event } from '../../utils/storage'
import { useAmount } from './use-amount'

interface Props {
  timeObserver: (fn: MutationCallback) => MutationObserver
  defaultTime?: string
  index?: number
}

export const Content = ({
  timeObserver,
  defaultTime = '',
  index = 0,
}: Props): JSX.Element | null => {
  const theme = useTheme()
  const [rate, setRate] = useStorageState<Event['rate']>({ selector: 'rate' })
  const [cost, setCost] = useStorageState<Event['cost']>({ selector: 'cost' })
  const [item, setItem] = useStorageState<Event['selection']>({
    selector: 'selection',
  })
  const time = useTimeObserver({ defaultTime, timeObserver })
  const amount = useAmount({ time, rate, cost })

  useOnMessage({ item, setItem, setRate, setCost })

  if (!item || !rate || !cost) {
    return null
  }

  return (
    <motion.div
      custom={index}
      initial="unmount"
      animate="mount"
      variants={itemvariants}
      style={{ minWidth: 90 }}
      key={item.name}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <motion.div variants={variants}>
          <ContentIcon as="div" color={theme.colors.blue[0]}>
            <Icon icon={item.name} />
          </ContentIcon>
        </motion.div>
        <motion.div variants={variants}>
          {time && <span style={{ fontWeight: 'bold' }}>{amount}</span>}
        </motion.div>
      </div>
    </motion.div>
  )
}

const itemvariants: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
}

const variants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
    rotate: 0,
  },
  unmount: {
    opacity: 0,
    y: 50,
    rotate: 180,
  },
}
