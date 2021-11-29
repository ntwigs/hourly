import { motion } from 'framer-motion'
import { useTheme } from 'styled-components'
import { Percentage, GRADIENT_ID } from './types'

export const Gradient = ({ percentage }: Percentage) => {
  const theme = useTheme()

  return (
    <defs>
      <linearGradient id={GRADIENT_ID} x1="0" x2="0" y1="100%" y2="0">
        <motion.stop
          animate={{ offset: `${percentage}%` }}
          stopColor={theme.colors.black[0]}
        />
        <motion.stop
          animate={{ offset: `${percentage}%` }}
          stopColor={theme.colors.black[1]}
        />
      </linearGradient>
    </defs>
  )
}
