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
  color: theme.colors.black[4],
}))
const InputTitleBase = styled(Typography)(({ theme }) => ({
  color: theme.colors.black[4],
}))
const InputValueBase = styled(Typography)(({ theme }) => ({
  fontWeight: theme.weight[1],
}))
const ContentTextBase = styled(Typography)(({ theme }) => ({
  fontWeight: theme.weight[2],
  color: 'inherit',
  fontFamily: 'inherit',
  fontSize: 'inherit',
}))

interface Props {
  children: ReactNode
}
export const Title = ({ children, ...props }: Props): JSX.Element => (
  <TitleBase as="h1" {...props}>
    {children}
  </TitleBase>
)
export const InputTitle = ({ children, ...props }: Props): JSX.Element => (
  <InputTitleBase as="p" {...props}>
    {children}
  </InputTitleBase>
)
export const InputValue = ({ children, ...props }: Props): JSX.Element => (
  <InputValueBase {...props}>{children}</InputValueBase>
)

export const ContentText = ({ children, ...props }: Props) => (
  <ContentTextBase as="span" {...props}>
    {children}
  </ContentTextBase>
)
