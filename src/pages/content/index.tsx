import { motion } from 'framer-motion'
import { useTheme } from 'styled-components'
import { ContentItem } from '../../components/item'
import { items } from '../../data/items'
import { Icon } from '../../components/icons'

export const Content = (): JSX.Element => {
  const theme = useTheme()
  const { name } = items[0]

  return (
    <motion.div initial="mount" style={{ width: 48 }} key={name}>
      <ContentItem isSelected={false} color={theme.colors.blue[0]}>
        <Icon icon={name} />
      </ContentItem>
    </motion.div>
  )
}
