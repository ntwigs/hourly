import { useRef, useEffect } from 'react'

export const useDidUpdate = (fn: () => void, input: unknown[]): void => {
  const ref = useRef(false)
  useEffect(() => {
    ref.current ? fn() : (ref.current = true)
  }, input)
}
