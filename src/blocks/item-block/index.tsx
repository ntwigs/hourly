import { Item } from '../../components/item'
import { Grid } from '../../components/grid'
import { Item as _Item } from '../../data/items'
import { useColor } from '../../hooks/use-color'
import { motion, Variants } from 'framer-motion'
import { Icon } from '../../components/icons'

interface Props {
  items: _Item[]
  onClick: (selection: _Item) => void
  selection: _Item
}

const parentVariants: Variants = {
  mount: {
    transition: {
      staggerChildren: 0.1,
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
    scale: 1.1,
  },
}

interface ColorIndex {
  index: number
}

const getColorIndex = ({ index }: ColorIndex): number => {
  const MAX = 8
  const HALF = MAX / 2
  const column = index % MAX
  return column >= HALF ? HALF - 1 - (column % HALF) : column
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
      {items.map(({ name, price }, index) => (
        <motion.div key={name} variants={itemVariants}>
          <motion.div variants={itemVariants} whileHover="hover">
            <Item
              isSelected={selection.name === name}
              onClick={selectItem({ name, price })}
              color={getColor({ color: getColorIndex({ index }) })}
            >
              <Icon icon={name} />
            </Item>
          </motion.div>
        </motion.div>
      ))}
    </Grid>
  )
}
