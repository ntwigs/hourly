import { useEffect } from 'react'
import { Event } from '../utils/storage'

interface UseDispatch {
  storageKey: keyof Event
  value: unknown
}

export const useDispatch = ({ storageKey, value }: UseDispatch) => {
  useEffect(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { [storageKey]: value })
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
}
