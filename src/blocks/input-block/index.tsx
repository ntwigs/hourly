import { Section } from '../../components/section'
import { InputTitle, InputValue } from '../../components/typography'
import { Input } from '../../components/input'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Spacer } from '../../components/spacer'
import styled from 'styled-components'
import { AnimatedText } from '../../components/animated-text'
import { motion, Variants } from 'framer-motion'
import { Item } from '../../data/items'

const Symbol = styled(InputValue)(({ theme }) => ({
  position: 'absolute',
  fontSize: theme.sizes[0],
  fontWeight: theme.weight[2],
  left: theme.spacing[1],
  color: theme.colors.black[0],
  paddingLeft: theme.spacing[2],
  fontFamily: theme.fonts.primary,
}))

const InputContainer = styled(motion.div)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

interface Props {
  title: string
  defaultValue: string
  store: string
  max?: number
  item?: Item
}

const containerVariant: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.02,
    },
  },
}

const inputVariants = {
  mount: {
    opacity: 1,
    y: 0,
  },
  unmount: {
    opacity: 0,
    y: 25,
  },
}

const useInput = (
  store: string,
  defaultValue: string
): [string | undefined, (text: string) => void] => {
  const [input, setInput] = useState<string>()

  const _setInput = (value: string) => {
    setInput(value)
    chrome.storage.local.set({ [store]: value })
  }

  useEffect(() => {
    chrome.storage.local.get(store).then((_input) => {
      const storedInput = _input[store]
      if (storedInput) {
        setInput(storedInput)
      } else {
        _setInput(`${defaultValue}`)
      }
    })
  }, [])

  return [input, _setInput]
}

const isNumber = (number: unknown): number is number =>
  typeof +(number as string) === 'number'

const useDidUpdate = (fn: () => void, input: unknown[]): void => {
  const ref = useRef(false)
  useEffect(() => {
    ref.current ? fn() : (ref.current = true)
  }, input)
}

export const InputBlock = ({
  title,
  defaultValue,
  max,
  store,
  item,
}: Props): JSX.Element => {
  const [value, setValue] = useInput(store, defaultValue)

  useDidUpdate(() => {
    if (value !== item?.price) {
      setValue(`${item?.price}`)
    }
  }, [item])

  useEffect(() => {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, { [store]: value })
        }
      })
    })
  }, [value])

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const isValid = isNumber(value)

  return (
    <Section>
      <Spacer size={3}>
        <Spacer as={motion.div} variants={containerVariant} size={2}>
          <InputTitle>
            <AnimatedText title={title} animation="slide" />
          </InputTitle>
        </Spacer>
        <InputContainer variants={inputVariants}>
          <Input
            onChange={onChange}
            value={value}
            maxLength={max}
            isInvalid={!isValid}
          />
          <Symbol>$</Symbol>
        </InputContainer>
      </Spacer>
    </Section>
  )
}
