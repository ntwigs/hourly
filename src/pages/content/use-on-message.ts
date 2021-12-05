import { useMount } from '@hooks/use-mount'
import { isNumber } from '@utils/is-number'
import { Event } from '@utils/storage'

interface OnMessage {
  item: Event['selection']
  setItem: (item: Event['selection']) => void
  setRate: (rate: Event['rate']) => void
  setCost: (cost: Event['cost']) => void
}

export const useOnMessage = ({
  item,
  setItem,
  setRate,
  setCost,
}: OnMessage) => {
  useMount(() => {
    chrome.runtime.onMessage.addListener(({ selection, rate, cost }: Event) => {
      if (selection && selection.name !== item?.name) {
        setItem(selection)
      }
      if (isNumber(rate)) {
        setRate(rate)
      }
      if (isNumber(cost)) {
        setCost(cost)
      }
    })
  })
}
