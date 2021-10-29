import styled from 'styled-components'

interface ContainerProps {
  isSelected?: boolean
  color: string
}

export const Item = styled.button<ContainerProps>(
  ({ theme, isSelected, color }) => ({
    background: color,
    borderRadius: theme.sizes[0],
    filter: isSelected ? 'saturate(1)' : 'saturate(0.6)',
    border: 'none',
    width: '100%',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    padding: theme.spacing[1],
  })
)
