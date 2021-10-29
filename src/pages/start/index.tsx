import { HeaderBlock } from '../../blocks/header-block'
import { InputBlock } from '../../blocks/input-block'
import { ItemBlock } from '../../blocks/item-block'
import { Layout } from '../../components/layout'
import { items } from '../../data/items'

export const Start = () => {
  return (
    <Layout>
      <HeaderBlock title="Hourly" />
      <InputBlock title="Rate per hour" />
      <InputBlock title="Price per burger" />
      <ItemBlock items={items} />
    </Layout>
  )
}
