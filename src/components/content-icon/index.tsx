import styled from 'styled-components'
import { Item } from '../item'

export const ContentIcon = styled(Item)(({ theme }) => ({
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
