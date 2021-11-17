import { useEffect } from 'react'
import { StorageKeys } from '../utils/storage'

interface UseDispatch {
  storageKey: StorageKeys[number]
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
  }, [value])
}
