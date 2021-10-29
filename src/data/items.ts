import hamburger from '../assets/hamburger.svg'
import apple from '../assets/apple-alt.svg'
import beer from '../assets/beer.svg'
import coffee from '../assets/coffee.svg'
import cookie from '../assets/cookie-bite.svg'
import game from '../assets/gamepad.svg'
import gas from '../assets/gas-pump.svg'
import wine from '../assets/wine-bottle.svg'

export interface Item {
  image: string
  price: number
  name: string
}

export const items: Item[] = [
  {
    image: hamburger,
    price: 10,
    name: 'hamburger',
  },
  {
    image: apple,
    price: 5,
    name: 'apple',
  },
  {
    image: beer,
    price: 45,
    name: 'beer',
  },
  {
    image: coffee,
    price: 15,
    name: 'coffee',
  },
  {
    image: cookie,
    price: 20,
    name: 'cookie',
  },
  {
    image: game,
    price: 250,
    name: 'game',
  },
  {
    image: gas,
    price: 18,
    name: 'gas',
  },
  {
    image: wine,
    price: 100,
    name: 'wine',
  },
]
