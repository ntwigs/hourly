import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HeaderBlock } from '../../blocks/header-block'
import { InputBlock } from '../../blocks/input-block'
import { ItemBlock } from '../../blocks/item-block'
import { Layout } from '../../components/layout'
import { Spacer } from '../../components/spacer'
import { Circle } from '../../components/circle'
import { Item, items } from '../../data/items'

const DEFAULT_HOURLY_RATE = '100'

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

export const Start = (): JSX.Element => {
  const [selection, setSelection] = useState<Item>(items[0])

  useEffect(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { selection })
        }
      })
    })
  }, [selection])

  return (
    <Layout
      animate="mount"
      initial="unmount"
      variants={variants}
      as={motion.main}
    >
      <Circle variants={circleVariants} />
      <HeaderBlock title="Hourly" />
      <InputBlock
        max={6}
        title="Rate per hour"
        defaultValue={DEFAULT_HOURLY_RATE}
      />
      <InputBlock
        title={`Price per ${selection.name}`}
        defaultValue={`${selection.price}`}
        max={6}
      />
      <Spacer size={4} />
      <ItemBlock items={items} selection={selection} onClick={setSelection} />
    </Layout>
  )
}
