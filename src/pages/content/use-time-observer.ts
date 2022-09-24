import { useState } from 'react'
import { useMount } from '@hooks/use-mount'

interface UseTimeObserver {
  getDefaultTime: () => string
  timeObserver: (callback: MutationCallback) => MutationObserver
}

const getTime = (mutation: MutationRecord): string | null => {
  if (mutation.target.nodeValue) {
    return mutation.target.nodeValue
  }

  const nodes = mutation.addedNodes
  const [time] = Array.from(nodes)
  return time.textContent
}

export const useTimeObserver = ({
  getDefaultTime,
  timeObserver,
}: UseTimeObserver): string => {
  const defaultTime = getDefaultTime()
  const [time, setTime] = useState<string>(defaultTime)

  useMount(() => {
    const callback: MutationCallback = (mutations) => {
      const [mutation] = mutations.reverse()

      const time = getTime(mutation)
      if (time) {
        setTime(time)
      }
    }

    const observer = timeObserver(callback)

    return () => observer.disconnect()
  })

  return time
}
