import { useState } from 'react'
import { storage, Event } from '@utils/storage'
import { useMount } from './use-mount'
import { useStorageEvent } from './use-storage-event'

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
        setStorageValue(defaultValue)
      }
    })
  })

  useStorageEvent({ selection: selector, setSelection: setValue })

  const setStorageValue = (value: T) => {
    storage.set({ [selector]: value })
  }

  return [value as T, setValue]
}
