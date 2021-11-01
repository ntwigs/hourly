import styled from 'styled-components'

export const Layout = styled.main(({ theme }) => ({
  width: 235,
  padding: theme.spacing[3],
  borderRadius: theme.sizes[0],
  background: theme.colors.black[3],
  position: 'relative',
  overflow: 'hidden',
  zIndex: 1
}))
