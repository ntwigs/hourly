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
  enter: {
    transition: {
      staggerChildren: 0.02,
    },
  },
}

const itemVariants: Variants = {
  enter: {
    opacity: 1,
    y: 0,
  },
}

export const ItemBlock = ({
  items,
  selection,
  onClick,
}: Props): JSX.Element => {
  const selectItem = (item: _Item) => () => void onClick(item)
  const getColor = useColor()

  return (
    <Grid animate="enter" variants={parentVariants}>
      {items.map(({ name, image, price }, index) => (
        <Item
          as={motion.div}
          key={name}
          isSelected={selection.name === name}
          onClick={selectItem({ name, image, price })}
          color={getColor({ color: index % 4 })}
          variants={itemVariants}
          initial={{
            opacity: 0,
            y: 100,
          }}
        >
          <img src={image} alt={name} />
        </Item>
      ))}
    </Grid>
  )
}
