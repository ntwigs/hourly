import { useTheme } from 'styled-components'

interface Color {
  color: number
}

export const useColor = () => {
  const theme = useTheme()
  const { black, ...primaries } = theme.colors
  const colors = Object.values(primaries).flat()

  return ({ color }: Color): string => colors[color]
}
