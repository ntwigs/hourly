import { Section } from '../../components/section'
import { InputTitle } from '../../components/typography'
import { Input } from '../../components/input'
import { ChangeEvent, useState } from 'react'
import { Spacer } from '../../components/spacer'

interface Props {
  title: string
}

export const InputBlock = ({ title }: Props): JSX.Element => {
  const [value, setValue] = useState<string>()

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return (
    <Section>
      <Spacer size={3}>
        <Spacer size={2}>
          <InputTitle>{title}</InputTitle>
        </Spacer>
        <Input placeholder="$" onChange={onChange} value={value} />
      </Spacer>
    </Section>
  )
}
