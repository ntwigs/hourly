import { useEffect, useState } from 'react'
import { ItemBlock } from '@blocks/item-block'
import { Item, items } from '@data/items'
import { storage } from '@utils/storage'
import { useMount } from '@hooks/use-mount'
import { useStorageEvent } from '@hooks/use-storage-event'

const useSelection = (): [Item | undefined, (item: Item) => void] => {
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
    storage.set({ cost: `${selection.price}` })
  }

  return [selection, setStorageSelection]
}

export const Items = (): JSX.Element | null => {
  const [selection, setSelection] = useSelection()

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
    <ItemBlock items={items} selection={selection} onClick={setSelection} />
  )
}
