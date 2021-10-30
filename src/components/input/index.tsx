import styled from 'styled-components'

export const Input = styled.input(({ theme }) => ({
  width: '100%',
  height: 45,
  border: `2px solid ${theme.colors.black[1]}`,
  borderRadius: theme.sizes[0],
  padding: theme.spacing[2],
  color: theme.colors.black[0],
  fontWeight: theme.weight[2],
  fontSize: theme.sizes[0],
}))
