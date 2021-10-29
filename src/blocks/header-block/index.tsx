import { ReactText } from 'react'
import { Section } from '../../components/section'
import { Spacer } from '../../components/spacer'
import { Title } from '../../components/typography'

interface Props {
  title: ReactText
}

export const HeaderBlock = ({ title }: Props): JSX.Element => {
  return (
    <Section>
      <Spacer size={4}>
        <Title>{title}</Title>
      </Spacer>
    </Section>
  )
}
