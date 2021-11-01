import styled from 'styled-components'
import { motion } from 'framer-motion'

const CIRCLE_SIZE = 345

export const Circle = styled(motion.div)(({ theme }) => ({
  width: CIRCLE_SIZE,
  height: CIRCLE_SIZE,
  borderRadius: CIRCLE_SIZE,
  background: theme.colors.blue[0],
  position: 'absolute',
  top: '-34%',
  right: '-24%',
  zIndex: -1,
}))
