import { motion, Variants } from 'framer-motion'
import { Spacer } from '@components/spacer'
import { ModalText, ModalTitle } from '@components/typography'
import { AnimatedText } from '@components/animated-text'
import { Button } from '@components/button'
import { Row } from '@components/row'
import { MouseEventHandler } from 'react'
import { Parser } from '@components/parser'
import { Grow } from '@components/grow'
import styled from 'styled-components'

const variants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: 5,
  },
}

const buttonContainerVariants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: 10,
  },
}

const containerVariant: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.5,
    },
  },
}

const Container = styled(motion.div)({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
})

interface Props {
  component?: CallableFunction | null
  title: string
  text: string
  onNext?: MouseEventHandler<HTMLButtonElement>
  onBack?: MouseEventHandler<HTMLButtonElement>
  onClose?: () => void | MouseEventHandler<HTMLButtonElement>
  isFirst: boolean
  isLast: boolean
}

export const OnboardSlide = ({
  title,
  text,
  onNext,
  onBack,
  onClose,
  isFirst,
  isLast,
  component,
}: Props) => {
  return (
    <Container variants={containerVariant} initial="unmount" animate="mount">
      <motion.div key={title} initial="unmount" animate="mount">
        <Spacer size={3}>
          <ModalTitle>
            <AnimatedText title={title} />
          </ModalTitle>
        </Spacer>
        <motion.div variants={variants}>
          <ModalText>
            <Parser text={text} />
          </ModalText>
        </motion.div>
      </motion.div>
      <Grow />
      {component && component({})}
      <Grow />
      <motion.div variants={buttonContainerVariants}>
        <Row>
          <Button isInverted onClick={isFirst ? onClose : onBack}>
            {isFirst ? 'skip' : 'back'}
          </Button>
          <Button onClick={isLast ? onClose : onNext}>
            {isLast ? 'start' : 'next'}
          </Button>
        </Row>
      </motion.div>
    </Container>
  )
}
