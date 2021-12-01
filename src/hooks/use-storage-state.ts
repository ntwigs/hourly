import { useEffect, useState } from 'react'
import { storage, Event } from '../utils/storage'

interface UseStorageState<T> {
  selector: keyof Event
  defaultValue: T
}

export const useStorageState = <T extends {}>({
  selector,
  defaultValue,
}: UseStorageState<T>): [T, (prop: T) => void] => {
  const [value, setValue] = useState<T>()

  useEffect(() => {
    storage.get(selector).then((value) => {
      const selectedValue = value[selector]
      if (selectedValue) {
        setValue(selectedValue)
      } else {
        setValue(defaultValue)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [value as T, setValue]
}
