import { motion } from 'framer-motion'
import { useTheme } from 'styled-components'
import { ContentItem } from '../../components/item'
import { items, Item } from '../../data/items'
import { Icon } from '../../components/icons'
import { useState } from 'react'

export const Content = (): JSX.Element => {
  const theme = useTheme()
  const [item, setItem] = useState<Item>(items[0])

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
    </motion.div>
  )
}
