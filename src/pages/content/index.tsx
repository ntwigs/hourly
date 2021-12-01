import { motion, Variants } from 'framer-motion'
import styled, { useTheme } from 'styled-components'
import { ContentIcon } from '../../components/content-icon'
import { Icon } from '../../components/icons'
import { useStorageState } from '../../hooks/use-storage-state'
import { useTimeObserver } from './use-time-observer'
import { useOnMessage } from './use-on-message'
import { Event } from '../../utils/storage'
import { useAmount } from './use-amount'
import { ContentText } from '../../components/typography'
import { useState } from 'react'
import { useShouldRender } from '../../hooks/use-should-render'

const VerticalCenter = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

interface Props {
  timeObserver: (fn: MutationCallback) => MutationObserver
  defaultTime?: string
  isTimer?: boolean
}

export const Content = ({
  timeObserver,
  defaultTime = '',
  isTimer,
}: Props): JSX.Element | null => {
  const theme = useTheme()
  const [rate, setRate] = useStorageState<Event['rate']>({ selector: 'rate' })
  const [cost, setCost] = useStorageState<Event['cost']>({ selector: 'cost' })
  const [item, setItem] = useStorageState<Event['selection']>({
    selector: 'selection',
  })
  const time = useTimeObserver({ defaultTime, timeObserver })
  const { items, percentage } = useAmount({ time, rate, cost })

  useOnMessage({ item, setItem, setRate, setCost })
  const [inView, setInView] = useState(false)
  const shouldRender = useShouldRender({ time: 500 })

  if (!shouldRender || !item || !rate || !cost) {
    return null
  }

  return (
    <motion.div
      initial="unmount"
      whileInView="mount"
      animate={inView ? 'mount' : undefined}
      onViewportEnter={() => setInView(true)}
      variants={itemvariants}
      viewport={{ once: true }}
    >
      <VerticalCenter>
        <motion.div variants={variants} key={item.name}>
          <ContentIcon as="div" color={theme.colors.blue[0]}>
            <Icon
              percentage={isTimer ? percentage : undefined}
              icon={item.name}
            />
          </ContentIcon>
        </motion.div>
        <motion.div variants={textVariants} key={items}>
          <ContentText>{items}</ContentText>
        </motion.div>
      </VerticalCenter>
    </motion.div>
  )
}

const itemvariants: Variants = {
  mount: {
    width: 90,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.25,
    },
  },
  unmount: {
    width: 0,
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

const textVariants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: 50,
  },
}
