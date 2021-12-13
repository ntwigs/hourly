import { InputBlock } from '@blocks/input-block'

const DEFAULT_HOURLY_RATE = '100'

export const Rate = (): JSX.Element => {
  return (
    <InputBlock
      store="rate"
      max={6}
      title="Rate per hour"
      defaultValue={DEFAULT_HOURLY_RATE}
    />
  )
}
