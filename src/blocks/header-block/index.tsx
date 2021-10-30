import { motion, Variants } from 'framer-motion'
import { Section } from '../../components/section'
import { Spacer } from '../../components/spacer'
import { Title } from '../../components/typography'

interface Props {
  title: string
}

const variants: Variants = {
  entry: {
    opacity: 1,
    y: 0,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    y: 360,
    rotate: 360,
  },
}

const AnimatedText = ({ title }: Props) => {
  const letters = title.split('')

  return (
    <>
      {letters.map((letter) => (
        <motion.span variants={variants}>{letter}</motion.span>
      ))}
    </>
  )
}

const containerVariant: Variants = {
  entry: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
    },
  },
}

export const HeaderBlock = ({ title }: Props): JSX.Element => {
  return (
    <Section>
      <Spacer size={4}>
        <motion.div animate="entry" variants={containerVariant}>
          <Title>
            <AnimatedText title={title} />
          </Title>
        </motion.div>
      </Spacer>
    </Section>
  )
}
