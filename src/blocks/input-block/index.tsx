import { Section } from '@components/section'
import { InputTitle, InputValue } from '@components/typography'
import { Input } from '@components/input'
import { ChangeEvent, useState } from 'react'
import { Spacer } from '@components/spacer'
import styled from 'styled-components'
import { AnimatedText } from '@components/animated-text'
import { motion, Variants } from 'framer-motion'
import { Item } from '@data/items'
import { Event, storage } from '@utils/storage'
import { useDispatch } from '@hooks/use-dispatch'
import { useDidUpdate } from '@hooks/use-did-update'
import { useMount } from '@hooks/use-mount'
import { useStorageEvent } from '@hooks/use-storage-event'

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
  store: keyof Event
  max?: number
  item?: Item
  invertLabel?: boolean
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
  store: keyof Event,
  defaultValue: string
): [string | undefined, (text: string) => void] => {
  const [input, setInput] = useState<string>()

  const setStorageInput = (value: string) => {
    storage.set({ [store]: value })
  }

  useStorageEvent({ selection: store, setSelection: setInput })

  useMount(() => {
    storage.get(store).then((input) => {
      const storedInput = input[store]
      if (storedInput) {
        setInput(storedInput)
      } else {
        setStorageInput(`${defaultValue}`)
      }
    })
  })

  return [input, setStorageInput]
}

const isNumber = (number: unknown): number is number =>
  typeof +(number as string) === 'number'

interface InvertableInputTitleProps {
  isInverted?: boolean
}

const InvertableInputTitle = styled(InputTitle)<InvertableInputTitleProps>(
  ({ theme, isInverted }) =>
    isInverted && {
      color: theme.colors.black[1],
      fontWeight: theme.weight[1],
    }
)

export const InputBlock = ({
  title,
  defaultValue,
  max,
  store,
  item,
  invertLabel,
}: Props): JSX.Element => {
  const [value, setValue] = useInput(store, defaultValue)

  useDidUpdate(() => {
    if (value !== item?.price) {
      setValue(`${item?.price}`)
    }
  }, [item])

  useDispatch({ storageKey: store, value })

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  const isValid = isNumber(value) && `${value}`.length > 0

  return (
    <Section>
      <Spacer size={3}>
        <Spacer as={motion.div} variants={containerVariant} size={2}>
          <InvertableInputTitle isInverted={invertLabel}>
            <AnimatedText title={title} animation="slide" />
          </InvertableInputTitle>
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
