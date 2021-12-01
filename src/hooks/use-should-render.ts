import { useState, useEffect } from 'react'

interface Props {
  time?: number
}

export const useShouldRender = ({ time = 0 }: Props): boolean => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShouldRender(true)
    }, time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return shouldRender
}