import { useState } from 'react'
import { Item } from '../../components/item'
import { Grid } from '../../components/grid'
import type { Item as _Item } from '../../data/items'
import { useColor } from '../../hooks/use-color'

interface Props {
  items: _Item[]
}

export const ItemBlock = ({ items }: Props): JSX.Element => {
  const [selected, setValue] = useState<string>()
  const getColor = useColor()

  return (
    <Grid>
      {items.map(({ name, image }, index) => (
        <Item
          key={name}
          isSelected={selected === name}
          onClick={() => setValue(name)}
          color={getColor({ color: index % 4 })}
        >
          <img src={image} alt={name} />
        </Item>
      ))}
    </Grid>
  )
}
