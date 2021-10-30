import { Section } from '../../components/section'
import { InputTitle } from '../../components/typography'
import { Input } from '../../components/input'
import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react'
import { Spacer } from '../../components/spacer'
import styled from 'styled-components'

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

const InputContainer = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

interface Props {
  title: string
  defaultValue: number
  max?: number
}

export const InputBlock = ({
  title,
  defaultValue,
  max,
}: Props): JSX.Element => {
  const [value, setValue] = useState<string>()
  const [ref, width] = useWidth(value ?? '')

  useEffect(() => {
    setValue(`${defaultValue}`)
  }, [defaultValue])

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return (
    <Section>
      <Spacer size={3}>
        <Spacer size={2}>
          <InputTitle>{title}</InputTitle>
        </Spacer>
        <InputContainer>
          <Input onChange={onChange} value={value} maxLength={max} />
          {(value ?? 0) > 0 && <Symbol left={width}>$</Symbol>}
        </InputContainer>
        <Span ref={ref}>{value}</Span>
      </Spacer>
    </Section>
  )
}
