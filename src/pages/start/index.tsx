import { motion, Variants } from 'framer-motion'
import { useState } from 'react'
import { HeaderBlock } from '@blocks/header-block'
import { Layout } from '@components/layout'
import { Spacer } from '@components/spacer'
import { Circle } from '@components/circle'
import { Item, items } from '@data/items'
import { storage } from '@utils/storage'
import { useMount } from '@hooks/use-mount'
import { Cost } from '@blocks/input-block/connected/cost'
import { Rate } from '@blocks/input-block/connected/rate'
import { Items } from '@blocks/item-block/connected/items'
import { useStorageEvent } from '@hooks/use-storage-event'

const variants: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
}

const circleVariants = {
  mount: {
    opacity: 1,
    scale: 1,
  },
  unmount: {
    opacity: 0,
    scale: 0,
  },
}

const useSelection = (): Item | undefined => {
  const [selection, setSelection] = useState<Item | undefined>()

  useMount(() => {
    storage.get('selection').then(({ selection }) => {
      selection ? setSelection(selection) : setSelection(items[0])
    })
  })

  useStorageEvent({ selection: 'selection', setSelection })

  return selection
}

export const Start = (): JSX.Element | null => {
  const selection = useSelection()

  if (!selection) {
    return null
  }

  return (
    <Layout
      animate="mount"
      initial="unmount"
      variants={variants}
      as={motion.main}
    >
      <Circle variants={circleVariants} />
      <HeaderBlock title="Hourly" />
      <Rate invertLabel={false} />
      <Cost selection={selection} invertLabel={false} />
      <Spacer size={4} />
      <Items selection={selection} />
    </Layout>
  )
}
