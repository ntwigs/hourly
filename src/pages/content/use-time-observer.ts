import { useState } from 'react'
import { useMount } from '@hooks/use-mount'

interface UseTimeObserver {
  getDefaultTime: () => string
  timeObserver: (callback: MutationCallback) => MutationObserver
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

      const nodes = mutation.addedNodes
      const [time] = Array.from(nodes)

      if (time.textContent) {
        setTime(time.textContent!)
      }
    }

    const observer = timeObserver(callback)

    return () => observer.disconnect()
  })

  return time
}
