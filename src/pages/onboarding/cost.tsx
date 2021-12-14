import { useEffect, useState } from 'react'
import { InputBlock } from '@blocks/input-block'
import { Item, items } from '@data/items'
import { storage } from '@utils/storage'
import { useMount } from '@hooks/use-mount'
import { useStorageEvent } from '@hooks/use-storage-event'

const useSelection = (): [Item | undefined] => {
  const [selection, setSelection] = useState<Item | undefined>()

  useMount(() => {
    storage.get('selection').then(({ selection }) => {
      if (selection) {
        setSelection(selection)
      } else {
        setStorageSelection(items[0])
      }
    })
  })

  useStorageEvent({ selection: 'selection', setSelection })

  const setStorageSelection = (selection: Item) => {
    setSelection(selection)
    storage.set({ selection })
  }

  return [selection]
}

export const Cost = (): JSX.Element | null => {
  const [selection] = useSelection()

  useEffect(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { selection })
        }
      })
    })
  }, [selection])

  if (!selection) {
    return null
  }

  return (
    <InputBlock
      invertLabel
      item={selection}
      store="cost"
      title={`Price per ${selection.name}`}
      defaultValue={`${selection.price}`}
      max={6}
    />
  )
}
