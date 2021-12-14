import { motion, Variants } from 'framer-motion'
import styled from 'styled-components'

interface InlineSpanProps {
  isBlank: boolean
}

const InlineSpan = styled(motion.span)<InlineSpanProps>(({ isBlank }) => ({
  display: isBlank ? 'inline' : 'inline-block',
}))

const rotate: Variants = {
  mount: {
    opacity: 1,
    rotate: 0,
    x: 0,
    y: 0,
  },
  unmount: {
    opacity: 0,
    rotate: -90,
    x: 10,
    y: 10,
  },
}

const slide: Variants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: 5,
  },
}

interface Animation {
  animation: 'rotate' | 'slide'
}

interface Props extends Partial<Animation> {
  title: string
}

const animations: Record<Animation['animation'], Variants> = {
  rotate,
  slide,
}

export const AnimatedText = ({ title, animation = 'rotate' }: Props) => {
  const letters = title.split('')

  return (
    <>
      {letters.map((letter, index) => (
        <InlineSpan
          key={`${title}-${letter}-${index}`}
          isBlank={letter === ' '}
          variants={animations[animation]}
        >
          {letter}
        </InlineSpan>
      ))}
    </>
  )
}
