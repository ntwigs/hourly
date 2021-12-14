import { motion, Variants } from 'framer-motion'
import { Spacer } from '@components/spacer'
import { ModalText, ModalTitle } from '@components/typography'
import { AnimatedText } from '@components/animated-text'
import { Button } from '@components/button'
import { Row } from '@components/row'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'

const Grow = styled.div({
  flexGrow: 1,
})

const variants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25,
    },
  },
  unmount: {
    opacity: 0,
    y: 5,
  },
}

const Strong = styled.span(({ theme }) => ({
  fontWeight: theme.weight[1],
}))

interface WithBoldProps {
  text: string
}

const WithBold = ({ text }: WithBoldProps): JSX.Element => {
  const textSplitByBold = text.split('*')
  return (
    <>
      {textSplitByBold.map((section, index) => {
        const isBold = index % 2
        return isBold ? <Strong>{section}</Strong> : section
      })}
    </>
  )
}

const buttonContainerVariants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
    },
  },
  unmount: {
    opacity: 0,
    y: 10,
  },
}

interface Props {
  component?: () => JSX.Element | null
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
    <>
      <motion.div animate="mount" initial="unmount" key={title}>
        <Spacer size={3}>
          <ModalTitle>
            <AnimatedText title={title} />
          </ModalTitle>
        </Spacer>
        <motion.div variants={variants}>
          <ModalText>
            <WithBold text={text} />
          </ModalText>
        </motion.div>
      </motion.div>
      <Grow />
      <motion.div
        variants={buttonContainerVariants}
        initial="unmount"
        animate="mount"
      >
        {component && component()}
      </motion.div>
      <Grow />
      <motion.div
        variants={buttonContainerVariants}
        initial="unmount"
        animate="mount"
      >
        <Row>
          <Button isInverted onClick={isFirst ? onClose : onBack}>
            {isFirst ? 'skip' : 'back'}
          </Button>
          <Button onClick={isLast ? onClose : onNext}>
            {isLast ? 'start' : 'next'}
          </Button>
        </Row>
      </motion.div>
    </>
  )
}
