import { Section } from '../../components/section'
import { InputTitle } from '../../components/typography'
import { Input } from '../../components/input'
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'
import { Spacer } from '../../components/spacer'
import styled from 'styled-components'
import { AnimatedText } from '../../components/animated-text'
import { motion, Variants } from 'framer-motion'

const Span = styled.span(({ theme }) => ({
  fontSize: theme.sizes[0],
  fontWeight: theme.weight[1],
  visibility: 'hidden',
  height: 0,
  position: 'absolute',
}))

interface SymbolProps {
  left: number
}

const Symbol = styled.span<SymbolProps>(({ left, theme }) => ({
  position: 'absolute',
  fontSize: theme.sizes[0],
  fontWeight: theme.weight[1],
  left: left + theme.spacing[1],
  color: theme.colors.black[0],
  paddingLeft: theme.spacing[2],
}))

const useWidth = (value?: string): [RefObject<HTMLElement>, number] => {
  const [width, setWidth] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = ref.current

    if (current) {
      const rect = current.getBoundingClientRect()
      setWidth(rect.width)
    }
  }, [value])

  return [ref, width]
}

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
  const [ref, width] = useWidth(value)

  useEffect(() => {
    if (value !== defaultValue) {
      setValue(`${defaultValue}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const shouldRenderSuffix = value.length > 0 && width > 0

  return (
    <Section>
      <Spacer size={3}>
        <Spacer as={motion.div} variants={containerVariant} size={2}>
          <InputTitle>
            <AnimatedText title={title} animation="slide" />
          </InputTitle>
        </Spacer>
        <InputContainer variants={inputVariants}>
          <Input onChange={onChange} value={value} maxLength={max} />
          {shouldRenderSuffix && <Symbol left={width}>$</Symbol>}
        </InputContainer>
        <Span ref={ref}>{value}</Span>
      </Spacer>
    </Section>
  )
}
