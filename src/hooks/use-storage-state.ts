import { useEffect, useState } from 'react'
import { storage, Event } from '../utils/storage'

interface UseStorageState {
  selector: keyof Event
}

export const useStorageState = <T extends {}>({
  selector,
}: UseStorageState): [T, (prop: T) => void] => {
  const [value, setValue] = useState<T>()

  useEffect(() => {
    storage.get(selector).then((value) => {
      const selectedValue = value[selector]
      setValue(selectedValue)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [value as T, setValue]
}
