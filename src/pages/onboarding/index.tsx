import { Modal } from '@components/modal'
import { OnboardSlide } from '@components/onboard-slide'
import { onboard } from '@data/onboard'
import { useMount } from '@hooks/use-mount'
import { storage } from '@utils/storage'
import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Cost } from '@blocks/input-block/connected/cost'
import { Rate } from '@blocks/input-block/connected/rate'
import { Items } from '@blocks/item-block/connected/items'

const useRenderModal = (): [
  boolean | undefined,
  (shouldRender: boolean) => void
] => {
  const [shouldRender, setShouldRender] = useState<boolean | undefined>(
    undefined
  )

  useMount(() => {
    storage.get('hasInitialized').then(({ hasInitialized }) => {
      if (!hasInitialized) {
        setShouldRender(true)
      }
    })
  })

  useEffect(() => {
    if (shouldRender === false) {
      storage.set({ hasInitialized: true })
    }
  }, [shouldRender])

  return [shouldRender, setShouldRender]
}

const components = {
  rate: Rate,
  cost: Cost,
  items: Items,
}

export const Onboarding = () => {
  const [index, setIndex] = useState(0)
  const [shouldRender, setShouldRender] = useRenderModal()
  const onNext = useCallback(() => setIndex((index) => index + 1), [])
  const onBack = useCallback(() => setIndex((index) => index - 1), [])
  const onClose = useCallback(() => setShouldRender(false), [setShouldRender])

  const { component, text, title } = onboard[index]

  return (
    <AnimatePresence>
      {shouldRender && (
        <Modal>
          <OnboardSlide
            title={title}
            component={component ? components[component] : null}
            text={text}
            onNext={onNext}
            onBack={onBack}
            onClose={onClose}
            isFirst={index === 0}
            isLast={index === onboard.length - 1}
          />
        </Modal>
      )}
    </AnimatePresence>
  )
}
