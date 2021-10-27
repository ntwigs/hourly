import { ReactText } from 'react'
import styled from 'styled-components'

const Typography = styled.h2(({ theme }) => ({
  fontSize: theme.sizes[0],
  fontFamily: theme.fonts.primary,
  color: theme.colors.black[0],
  fontWeight: theme.weight[0],
}))

const TitleBase = styled(Typography)(({ theme }) => ({
  fontSize: theme.sizes[1],
  fontWeight: theme.weight[2],
}))
const InputTitleBase = styled(Typography)({})
const InputValueBase = styled(Typography)(({ theme }) => ({
  fontWeight: theme.weight[1],
}))

interface Props {
  children: ReactText
}
export const Title = ({ children }: Props): JSX.Element => (
  <TitleBase as="h1">{children}</TitleBase>
)
export const InputTitle = ({ children }: Props): JSX.Element => (
  <InputTitleBase as="p">{children}</InputTitleBase>
)
export const InputValue = ({ children }: Props): JSX.Element => (
  <InputValueBase>{children}</InputValueBase>
)
