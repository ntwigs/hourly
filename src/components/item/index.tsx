import styled from 'styled-components'

interface Props {
  isSelected?: boolean
}

export const Item = styled.button<Props>(({ isSelected }) => ({
  width: 45,
  height: 45,
  borderRadius: 16,
  filter: isSelected ? 'saturate(0.2)' : 'saturate(1)',
}))
