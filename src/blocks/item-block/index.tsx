import { Item } from '../../components/item'
import { Grid } from '../../components/grid'
import type { Item as _Item } from '../../data/items'
import { useColor } from '../../hooks/use-color'
import { motion, Variants } from 'framer-motion'

interface Props {
  items: _Item[]
  onClick: (selection: _Item) => void
  selection: _Item
}

const parentVariants: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  mount: {
    opacity: 1,
    y: 0,
    rotate: 0,
  },
  unmount: {
    opacity: 0,
    y: 50,
    rotate: 180,
  },
  hover: {
    scale: 1.2,
  },
}

interface ColorIndex {
  index: number
}

const getColorIndex = ({ index }: ColorIndex): number => {
  const MAX = 4
  const a = index % MAX
  const b = index % 8

  console.log(a, b)

  return index % 4
}

export const ItemBlock = ({
  items,
  selection,
  onClick,
}: Props): JSX.Element => {
  const selectItem = (item: _Item) => () => void onClick(item)
  const getColor = useColor()

  return (
    <Grid variants={parentVariants}>
      {items.map(({ name, image, price }, index) => (
        <Item
          whileHover="hover"
          as={motion.div}
          key={name}
          isSelected={selection.name === name}
          onClick={selectItem({ name, image, price })}
          color={getColor({ color: getColorIndex({ index }) })}
          variants={itemVariants}
        >
          <img src={image} alt={name} />
        </Item>
      ))}
    </Grid>
  )
}
