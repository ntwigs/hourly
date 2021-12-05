import { Beer } from './beer'
import { items } from '@data/items'
import { Wine } from './wine'
import { Hamburger } from './hamburger'
import { Gas } from './gas-pump'
import { Apple } from './apple'
import { Coffee } from './coffee'
import { Cookie } from './cookie'
import { Gamepad } from './gamepad'
import { Fill, GRADIENT_ID } from './types'
import { Gradient } from './gradient'

type Icons = typeof items[number]['name']

const icons: Record<Icons, ({ fill }: Fill) => JSX.Element> = {
  beer: Beer,
  apple: Apple,
  coffee: Coffee,
  cookie: Cookie,
  game: Gamepad,
  gas: Gas,
  hamburger: Hamburger,
  wine: Wine,
}

interface Props {
  icon: keyof typeof icons
  percentage?: number
}

export const Icon = ({ icon, percentage }: Props): JSX.Element => {
  const Component = icons[icon]
  const hasPercentage = percentage !== undefined

  return (
    <svg key={icon} viewBox="0 0 32 32">
      {hasPercentage && <Gradient percentage={percentage} />}
      <Component
        fill={hasPercentage ? `url(#${GRADIENT_ID})` : 'currentColor'}
      />
    </svg>
  )
}
