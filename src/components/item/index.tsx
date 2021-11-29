import styled from 'styled-components'

interface ContainerProps {
  isSelected?: boolean
  color?: string
}

export const Item = styled.button<ContainerProps>(
  ({ theme, isSelected, color }) => ({
    background: isSelected ? color : theme.colors.black[3],
    borderRadius: theme.sizes[0],
    border: 'none',
    width: '100%',
    aspectRatio: '1',
    cursor: 'pointer',
    padding: theme.spacing[1],
    transition: 'background 250ms',
    color: theme.colors.black[4],

    '&:hover': {
      background: color,
    },
  })
)
