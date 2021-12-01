import { useRef, useEffect } from 'react'

export const useDidUpdate = (
  fn: () => void,
  input: readonly unknown[]
): void => {
  const ref = useRef(false)
  useEffect(() => {
    ref.current ? fn() : (ref.current = true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, input)
}
