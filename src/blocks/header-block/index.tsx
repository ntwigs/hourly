import { ReactText } from 'react'
import { Section } from '../../components/section'
import { Title } from '../../components/typography'

interface Props {
  title: ReactText
}

export const HeaderBlock = ({ title }: Props): JSX.Element => {
  return (
    <Section>
      <Title>{title}</Title>
    </Section>
  )
}
