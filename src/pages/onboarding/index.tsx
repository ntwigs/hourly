import { Modal } from '@components/modal'
import { onboard } from '@data/onboard'
import { useCallback, useState } from 'react'

export const Onboarding = () => {
  const [index, setIndex] = useState(0)
  const [shouldRender] = useState(true)
  const onNext = useCallback(() => setIndex((index) => index + 1), [])
  const onBack = useCallback(() => setIndex((index) => index - 1), [])
  const onClose = useCallback(() => setIndex((index) => index - 1), [])

  if (!shouldRender) {
    return null
  }

  const { image, text, title } = onboard[index]

  return (
    <Modal
      title={title}
      image={image}
      text={text}
      onNext={onNext}
      onBack={onBack}
      onClose={onClose}
      isFirst={index === 0}
      isLast={index === onboard.length - 1}
    />
  )
}
