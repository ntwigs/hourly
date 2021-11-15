import { motion } from 'framer-motion'
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
  time?: string
}

export const Content = ({ time }: Props): JSX.Element | null => {
  const theme = useTheme()
  const [item, setItem] = useState<Item>()
  const [rate, setRate] = useState<string | undefined>()
  const [cost, setCost] = useState<string | undefined>()
  const amount = useAmount({ time, rate, cost })

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
    <motion.div initial="mount" style={{ width: 48 }} key={item.name}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <ContentIcon as="div" color={theme.colors.blue[0]}>
          <Icon icon={item.name} />
        </ContentIcon>
        {time && <span style={{ fontWeight: 'bold' }}>{amount}</span>}
      </div>
    </motion.div>
  )
}
