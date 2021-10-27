import { Section } from '../../components/section'
import { InputTitle } from '../../components/typography'
import { Input } from '../../components/input'
import { ChangeEvent, useState } from 'react'

interface Props {
  title: string
}

export const InputBlock = ({ title }: Props): JSX.Element => {
  const [value, setValue] = useState<string>()

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return (
    <Section>
      <InputTitle>{title}</InputTitle>
      <Input placeholder="$" onChange={onChange} value={value} />
    </Section>
  )
}
