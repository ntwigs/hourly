import { motion } from 'framer-motion'
import { ReactNode, useState, useCallback } from 'react'

interface Props {
  children: ReactNode
}

export const Intersect = ({ children }: Props): JSX.Element => {
  const [inView, setInView] = useState(false)

  const onViewportEnter = useCallback(() => setInView(true), [])
  const onViewportLeave = useCallback(() => setInView(false), [])

  return (
    <>
      <motion.div
        onViewportEnter={onViewportEnter}
        onViewportLeave={onViewportLeave}
      />
      {inView ? children : null}
    </>
  )
}
