import { motion } from 'framer-motion'
import { useTheme } from 'styled-components'
import { ContentIcon } from '../../components/content-icon'
import { items, Item } from '../../data/items'
import { Icon } from '../../components/icons'
import { useMemo, useEffect, useState } from 'react'

interface Time {
  time?: string
}

const isTime = (time: unknown): time is string => typeof time === 'string'

const rate = 100
const price = 15

const getAmount = ({ time }: Time): string => {
  if (!isTime(time)) return ''

  const [hours, minutes, seconds] = time.split(':')
  const decimalHours = +hours + +minutes / 60 + +seconds / 3600

  const salary = rate * decimalHours
  return (salary / price).toFixed(0)
}

const useAmount = ({ time }: Time): string => {
  const amount = useMemo(() => getAmount({ time }), [time])
  return amount
}

interface Props {
  time?: string
}

export const Content = ({ time }: Props): JSX.Element | null => {
  const theme = useTheme()
  const [item, setItem] = useState<Item>()
  const amount = useAmount({ time })

  useEffect(() => {
    chrome.storage.local.get('selection').then(({ selection: _selection }) => {
      if (_selection) {
        setItem(_selection)
      } else {
        setItem(items[0])
      }
    })
  }, [])

  if (!item) {
    return null
  }

  chrome.runtime.onMessage.addListener(({ selection }: { selection: Item }) => {
    if (selection.name !== item.name) {
      setItem(selection)
    }
  })

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
