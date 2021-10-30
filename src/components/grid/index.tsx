import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Grid = styled(motion.section)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing[2],
}))
