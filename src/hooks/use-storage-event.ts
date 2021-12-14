import { useMount } from './use-mount'
import { Event } from '@utils/storage'

interface UseStorageEvent {
  selection: keyof Event
  setSelection: CallableFunction
}

export const useStorageEvent = ({
  selection,
  setSelection,
}: UseStorageEvent): void => {
  useMount(() => {
    chrome.storage.onChanged.addListener((event) => {
      if (event[selection] && event[selection].newValue) {
        setSelection(event[selection].newValue)
      }
    })
  })
}
