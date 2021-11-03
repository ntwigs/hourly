import { Beer } from './beer'
import { items } from '../../data/items'
import { Wine } from './wine'
import { Hamburger } from './hamburger'
import { Gas } from './gas-pump'
import { Apple } from './apple'
import { Coffee } from './coffee'
import { Cookie } from './cookie'
import { Gamepad } from './gamepad'

type Icons = typeof items[number]['name']

const icons: Record<Icons, () => JSX.Element> = {
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
}

export const Icon = ({ icon }: Props): JSX.Element => {
  const Component = icons[icon]
  return <Component />
}
