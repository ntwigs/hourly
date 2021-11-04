import { motion } from 'framer-motion'
import { useTheme } from 'styled-components'
import { ContentItem } from '../../components/item'
import { items, Item } from '../../data/items'
import { Icon } from '../../components/icons'
import { useEffect, useState } from 'react'

interface Props {
  time?: string
}

export const Content = ({ time }: Props): JSX.Element | null => {
  const theme = useTheme()
  const [item, setItem] = useState<Item>()

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
      <ContentItem as="div" color={theme.colors.blue[0]}>
        <Icon icon={item.name} />
      </ContentItem>
      {time && <span>{time}</span>}
    </motion.div>
  )
}
