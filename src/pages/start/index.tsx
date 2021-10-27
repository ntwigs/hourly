import { HeaderBlock } from '../../blocks/header-block'
import { InputBlock } from '../../blocks/input-block'
import { ItemBlock } from '../../blocks/item-block'
import { Layout } from '../../components/layout'

export const Start = () => {
  return (
    <Layout>
      <HeaderBlock title="Hourly" />
      <InputBlock title="Rate per hour" />
      <InputBlock title="Price per burger" />
      <ItemBlock items={['burger', 'potatoe', 'keyboard']} />
    </Layout>
  )
}
