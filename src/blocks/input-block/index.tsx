import { Section } from '../../components/section'
import { InputTitle, InputValue } from '../../components/typography'
import { Input } from '../../components/input'
import { ChangeEvent, useEffect, useState } from 'react'
import { Spacer } from '../../components/spacer'
import styled from 'styled-components'
import { AnimatedText } from '../../components/animated-text'
import { motion, Variants } from 'framer-motion'

const Symbol = styled(InputValue)(({ theme }) => ({
  position: 'absolute',
  fontSize: theme.sizes[0],
  fontWeight: theme.weight[2],
  left: theme.spacing[1],
  color: theme.colors.black[0],
  paddingLeft: theme.spacing[2],
  fontFamily: theme.fonts.primary
}))

const InputContainer = styled(motion.div)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

interface Props {
  title: string
  defaultValue: string
  max?: number
}

const containerVariant: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.02,
    },
  },
}

const inputVariants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: 25,
  },
}

export const InputBlock = ({
  title,
  defaultValue,
  max,
}: Props): JSX.Element => {
  const [value, setValue] = useState<string>(`${defaultValue}`)

  useEffect(() => {
    if (value !== defaultValue) {
      setValue(`${defaultValue}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const isValid = value.length > 0 && typeof +value === 'number'

  return (
    <Section>
      <Spacer size={3}>
        <Spacer as={motion.div} variants={containerVariant} size={2}>
          <InputTitle>
            <AnimatedText title={title} animation="slide" />
          </InputTitle>
        </Spacer>
        <InputContainer variants={inputVariants}>
          <Input onChange={onChange} value={value} maxLength={max} isInvalid={!isValid} />
          <Symbol>$</Symbol>
        </InputContainer>
      </Spacer>
    </Section>
  )
}
