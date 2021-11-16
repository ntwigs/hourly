import { motion, Variants } from 'framer-motion'
import { useTheme } from 'styled-components'
import { ContentIcon } from '../../components/content-icon'
import { Item } from '../../data/items'
import { Icon } from '../../components/icons'
import { useMemo, useEffect, useState } from 'react'

interface UseAmount {
  time?: string
  rate?: string
  cost?: string
}

const isString = (value: unknown): value is string => typeof value === 'string'
const isNumber = (value: unknown): value is number =>
  typeof +(value as string) === 'number'

const getAmount = ({ time, rate, cost }: UseAmount): string => {
  if (!isString(time)) return ''
  if (!isNumber(rate)) return ''
  if (!isNumber(cost)) return ''

  const [hours, minutes, seconds] = time.split(':')
  const decimalHours = +hours + +minutes / 60 + +seconds / 3600

  const salary = +rate * decimalHours
  return (salary / +cost).toFixed(0)
}

const useAmount = ({ time, rate, cost }: UseAmount): string => {
  const amount = useMemo(
    () => getAmount({ time, rate, cost }),
    [time, rate, cost]
  )
  return amount
}

interface Props {
  timeObserver: (fn: MutationCallback) => void
  defaultTime?: string
  index?: number
}

export const Content = ({
  timeObserver,
  defaultTime = '',
  index = 0,
}: Props): JSX.Element | null => {
  const theme = useTheme()
  const [item, setItem] = useState<Item>()
  const [rate, setRate] = useState<string | undefined>()
  const [cost, setCost] = useState<string | undefined>()
  const [time, setTime] = useState<string>(defaultTime)
  const amount = useAmount({ time, rate, cost })

  useEffect(() => {
    const callback: MutationCallback = (mutations) => {
      const [mutation] = mutations
      const nodes = mutation.addedNodes
      const [time] = Array.from(nodes)
      setTime(time.textContent!)
    }

    timeObserver(callback)
  }, [])

  useEffect(() => {
    chrome.storage.local.get('selection').then(({ selection: _selection }) => {
      setItem(_selection)
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.get('rate').then(({ rate: _rate }) => {
      setRate(_rate)
    })
  }, [])

  useEffect(() => {
    chrome.storage.local.get('cost').then(({ cost: _cost }) => {
      setCost(_cost)
    })
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      ({
        selection,
        rate,
        cost,
      }: {
        selection: Item
        rate: string
        cost: string
      }) => {
        if (selection && selection.name !== item?.name) {
          setItem(selection)
        }
        if (rate && rate.length > 0) {
          setRate(rate)
        }
        if (cost && cost.length > 0) {
          setCost(cost)
        }
      }
    )
  }, [])

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
