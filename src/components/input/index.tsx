import styled from 'styled-components'

interface Props {
  isInvalid?: boolean
}

export const Input = styled.input<Props>(({ theme, isInvalid }) => ({
  width: '100%',
  height: 45,
  border: `2px solid ${isInvalid ? theme.colors.red[0] : theme.colors.black[1]}`,
  borderRadius: theme.sizes[0],
  padding: theme.spacing[2],
  paddingLeft: theme.spacing[4],
  color: theme.colors.black[0],
  fontWeight: theme.weight[2],
  fontSize: theme.sizes[0],
  outline: 'none',
  fontFamily: theme.fonts.primary,
  transition: 'border 250ms'
}))
