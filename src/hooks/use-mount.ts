import { useEffect } from 'react'

export const useMount = (effect: CallableFunction): void => {
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
