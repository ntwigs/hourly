import { useState } from 'react'
import { InputBlock } from '@blocks/input-block'
import { Item } from '@data/items'
import { storage } from '@utils/storage'
import { useMount } from '@hooks/use-mount'
import { useStorageEvent } from '@hooks/use-storage-event'
import { useDispatch } from '@hooks/use-dispatch'

interface UseSelectionProps {
  parentSelection?: Item
}

const useSelection = ({
  parentSelection,
}: UseSelectionProps): Item | undefined => {
  const [selection, setSelection] = useState<Item | undefined>()

  useMount(() => {
    storage.get('selection').then(({ selection }) => {
      if (selection) {
        setSelection(selection)
      }
    })
  })

  useStorageEvent({ selection: 'selection', setSelection })

  return parentSelection ? parentSelection : selection
}

interface Props {
  invertLabel?: boolean
  selection: Item
}

export const Cost = ({
  invertLabel = true,
  selection: _selection,
}: Props): JSX.Element | null => {
  const selection = useSelection({ parentSelection: _selection })

  useDispatch({ storageKey: 'selection', value: selection })

  return (
    <InputBlock
      invertLabel={invertLabel}
      item={selection}
      store="cost"
      title={`Price per ${selection?.name}`}
      defaultValue={`${selection?.price}`}
      max={6}
    />
  )
}
