import { motion, Variants } from 'framer-motion'
import styled from 'styled-components'
import { ContentIcon } from '@components/content-icon'
import { Icon } from '@components/icons'
import { useContent, Props } from './use-content'
import { ContentText } from '@components/typography'

const VerticalCenter = styled.div({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
})

export const Content = ({
  timeObserver,
  defaultTime = '',
  isTimer,
}: Props): JSX.Element | null => {
  const { items, percentage, item } = useContent({ timeObserver, defaultTime })

  if (!item) {
    return null
  }

  return (
    <motion.div initial="unmount" animate="mount" variants={itemvariants}>
      <VerticalCenter>
        <motion.div variants={variants} key={item.name}>
          <ContentIcon as="div">
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
