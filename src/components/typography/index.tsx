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

const ModalTitleBase = styled(Typography)(({ theme }) => ({
  fontSize: theme.sizes[1],
  fontWeight: theme.weight[2],
  color: theme.colors.black[0],
}))

const ModalTextBase = styled(Typography)(({ theme }) => ({
  fontWeight: theme.weight[0],
  color: theme.colors.black[1],
  lineHeight: 1.2,
}))

const ButtonTextBase = styled(Typography)(({ theme }) => ({
  fontWeight: theme.weight[1],
  color: 'inherit',
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

export const ModalTitle = ({ children, ...props }: Props) => (
  <ModalTitleBase as="h2" {...props}>
    {children}
  </ModalTitleBase>
)

export const ModalText = ({ children, ...props }: Props) => (
  <ModalTextBase as="span" {...props}>
    {children}
  </ModalTextBase>
)

export const ButtonText = ({ children, ...props }: Props) => (
  <ButtonTextBase as="span" {...props}>
    {children}
  </ButtonTextBase>
)
