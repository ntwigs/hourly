import { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'
import { Backdrop, variants as backdropVariants } from '@components/backdrop'

interface Props {
  onBackdropClick?: () => void | MouseEventHandler<HTMLButtonElement>
  children: ReactNode
}

const Container = styled(motion.main)({
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 16,
})

const Box = styled(motion.div)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.colors.black[4],
  padding: theme.spacing[3],
  borderRadius: theme.sizes[0],
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
}))

const boxVariants: Variants = {
  mount: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.25,
    },
  },
  unmount: {
    opacity: 0,
    scale: 0.2,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      stiffness: 10,
    },
  },
}

export const Modal = ({ onBackdropClick, children }: Props): JSX.Element => {
  return (
    <Container initial="unmount" animate="mount" exit="exit">
      <Backdrop variants={backdropVariants} onClick={onBackdropClick} />
      <Box variants={boxVariants}>{children}</Box>
    </Container>
  )
}
