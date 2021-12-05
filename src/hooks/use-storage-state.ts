import { useState } from 'react'
import { storage, Event } from '@utils/storage'
import { useMount } from './use-mount'

interface UseStorageState<T> {
  selector: keyof Event
  defaultValue: T
}

export const useStorageState = <T extends {}>({
  selector,
  defaultValue,
}: UseStorageState<T>): [T, (prop: T) => void] => {
  const [value, setValue] = useState<T>()

  useMount(() => {
    storage.get(selector).then((value) => {
      const selectedValue = value[selector]
      if (selectedValue) {
        setValue(selectedValue)
      } else {
        setValue(defaultValue)
      }
    })
  })

  return [value as T, setValue]
}
