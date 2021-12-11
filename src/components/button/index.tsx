import { MouseEventHandler, ReactNode } from 'react'
import { ButtonText } from '@components/typography'
import styled from 'styled-components'
import { motion, Variants } from 'framer-motion'

interface Invertable {
  isInverted?: boolean
}

const ButtonContainer = styled(motion.button)<Invertable>(
  ({ theme, isInverted }) => ({
    background: isInverted ? theme.colors.black[4] : theme.colors.blue[0],
    borderRadius: theme.sizes[0],
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    padding: theme.spacing[1],
    transition: 'background 250ms',
    color: isInverted ? theme.colors.blue[0] : theme.colors.black[4],
  })
)

interface Props extends Invertable {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const rotate: Variants = {
  mount: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  unmount: {
    opacity: 0,
    x: 10,
    y: 10,
  },
}

export const Button = ({
  children,
  onClick,
  isInverted,
}: Props): JSX.Element => {
  return (
    <ButtonContainer onClick={onClick} isInverted={isInverted}>
      <motion.div
        variants={rotate}
        initial="unmount"
        animate="mount"
        key={children as string}
      >
        <ButtonText>{children}</ButtonText>
      </motion.div>
    </ButtonContainer>
  )
}
