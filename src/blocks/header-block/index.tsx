import { motion, Variants } from 'framer-motion'
import { AnimatedText } from '../../components/animated-text'
import { Section } from '../../components/section'
import { Spacer } from '../../components/spacer'
import { Title } from '../../components/typography'

interface Props {
  title: string
}

const containerVariant: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

export const HeaderBlock = ({ title }: Props): JSX.Element => {
  return (
    <Section>
      <Spacer size={4}>
        <motion.div variants={containerVariant}>
          <Title>
            <AnimatedText title={title} />
          </Title>
        </motion.div>
      </Spacer>
    </Section>
  )
}
