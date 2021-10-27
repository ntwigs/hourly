import { Section } from '../../components/section'
import { useState } from 'react'
import { Item } from '../../components/item'

interface Props {
  items: string[]
}

export const ItemBlock = ({ items }: Props): JSX.Element => {
  const [selected, setValue] = useState<string>()

  return (
    <Section>
      {items.map((item) => (
        <Item
          key="item"
          isSelected={selected === item}
          onClick={() => setValue(item)}
        >
          {item}
        </Item>
      ))}
    </Section>
  )
}
