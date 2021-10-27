import styled from 'styled-components'

export const Input = styled.input(({ theme }) => ({
  width: '100%',
  height: 45,
  outline: `2px solid ${theme.colors.black[1]}`,
}))
