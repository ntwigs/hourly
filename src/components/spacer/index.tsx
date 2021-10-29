import styled from 'styled-components'

interface Props {
  size?: number
}

export const Spacer = styled.div<Props>(({ theme, size = 0 }) => ({
  marginBottom: theme.spacing[size],
}))
