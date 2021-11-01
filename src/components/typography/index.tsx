import { ReactNode } from 'react'
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
  children: ReactNode
}
export const Title = ({ children, ...props }: Props): JSX.Element => (
  <TitleBase as="h1" {...props}>{children}</TitleBase>
)
export const InputTitle = ({ children, ...props }: Props): JSX.Element => (
  <InputTitleBase as="p" {...props}>{children}</InputTitleBase>
)
export const InputValue = ({ children, ...props }: Props): JSX.Element => (
  <InputValueBase {...props}>{children}</InputValueBase>
)
