import styled from 'styled-components'
import { Item } from '../item'

interface Props {
  color?: string
}

export const ContentIcon = styled(Item)<Props>(({ theme }) => ({
  minWidth: theme.sizes[2],
  maxWidth: theme.sizes[2],
  width: theme.sizes[2],
  background: 'transparent',
  cursor: 'auto',
  color: theme.colors.black[0],

  '&:hover': {
    background: 'transparent',
  },
}))
