import { MouseEventHandler, ReactNode } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

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

const Backdrop = styled(motion.div)({
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: 'rgba(34, 70, 90, 0.5)',
  backdropFilter: 'blur(2px)',
  top: 0,
  left: 0,
  cursor: 'pointer',
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

export const Modal = ({ onBackdropClick, children }: Props): JSX.Element => {
  return (
    <Container>
      <Backdrop
        onClick={onBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <Box
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            delay: 0.25,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.5,
          transition: {
            stiffness: 10,
          },
        }}
      >
        {children}
      </Box>
    </Container>
  )
}
