import { Button } from '@components/button'
import { Row } from '@components/row'
import { AnimatedText } from '@components/animated-text'
import { Spacer } from '@components/spacer'
import { ModalText, ModalTitle } from '@components/typography'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'

interface Props {
  image: string
  title: string
  text: string
  onNext?: MouseEventHandler<HTMLButtonElement>
  onBack?: MouseEventHandler<HTMLButtonElement>
  onClose?: MouseEventHandler<HTMLButtonElement>
  isFirst: boolean
  isLast: boolean
}

const Container = styled(motion.main)({
  width: 235,
  height: 377,
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
})

const Backdrop = styled.div({
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: 'rgba(0, 0, 0, 0.2)',
  top: 0,
  left: 0,
})

const Box = styled.div(({ theme }) => ({
  width: '100%',
  height: 260,
  background: theme.colors.black[4],
  padding: theme.spacing[3],
  borderRadius: theme.sizes[0],
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
}))

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

const WithBold = ({ text }: Pick<Props, 'text'>): JSX.Element => {
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

export const Modal = ({
  title,
  text,
  onNext,
  onBack,
  onClose,
  isFirst,
  isLast,
}: Props): JSX.Element => {
  return (
    <Container>
      <Backdrop />
      <Box>
        <motion.div animate="mount" initial="unmount" key={title}>
          <Spacer size={3}>
            <ModalTitle>
              <AnimatedText title={title} />
            </ModalTitle>
          </Spacer>
          <Spacer size={3}>
            <motion.div variants={variants}>
              <ModalText>
                <WithBold text={text} />
              </ModalText>
            </motion.div>
          </Spacer>
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
      </Box>
    </Container>
  )
}
