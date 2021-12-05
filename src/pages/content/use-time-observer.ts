import { useState } from 'react'
import { useMount } from '@hooks/use-mount'

interface UseTimeObserver {
  defaultTime: string
  timeObserver: (callback: MutationCallback) => MutationObserver
}

export const useTimeObserver = ({
  defaultTime,
  timeObserver,
}: UseTimeObserver): string => {
  const [time, setTime] = useState<string>(defaultTime)

  useMount(() => {
    const callback: MutationCallback = (mutations) => {
      const [mutation] = mutations.reverse()

      const nodes = mutation.addedNodes
      const [time] = Array.from(nodes)
      setTime(time.textContent!)
    }

    const observer = timeObserver(callback)

    return () => observer.disconnect()
  })

  return time
}
