import styled from 'styled-components'

export const Layout = styled.main(({ theme }) => ({
  width: 235,
  padding: theme.spacing[3],
  background: theme.colors.black[4],
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
}))
