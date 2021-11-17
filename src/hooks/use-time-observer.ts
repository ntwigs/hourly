import { useEffect, useState } from 'react'

interface UseTimeObserver {
  defaultTime: string
  timeObserver: (callback: MutationCallback) => void
}

export const useTimeObserver = ({
  defaultTime,
  timeObserver,
}: UseTimeObserver): string => {
  const [time, setTime] = useState<string>(defaultTime)

  useEffect(() => {
    const callback: MutationCallback = (mutations) => {
      const [mutation] = mutations
      const nodes = mutation.addedNodes
      const [time] = Array.from(nodes)
      setTime(time.textContent!)
    }

    timeObserver(callback)
  }, [])

  return time
}
