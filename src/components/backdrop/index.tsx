import { motion, Variants } from 'framer-motion'
import styled from 'styled-components'

export const variants: Variants = {
  mount: {
    opacity: 1,
  },
  unmount: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
}

export const Backdrop = styled(motion.div)(({ theme }) => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: theme.colors.blue[1],
  backdropFilter: 'blur(2px)',
  top: 0,
  left: 0,
  cursor: 'pointer',
}))
