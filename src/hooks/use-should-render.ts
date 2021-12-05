import { useState } from 'react'
import { useMount } from './use-mount'

interface Props {
  time?: number
}

export const useShouldRender = ({ time = 0 }: Props): boolean => {
  const [shouldRender, setShouldRender] = useState(false)

  useMount(() => {
    setTimeout(() => {
      setShouldRender(true)
    }, time)
  })

  return shouldRender
}
