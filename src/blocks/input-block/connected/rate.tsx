import { InputBlock } from '@blocks/input-block'

const DEFAULT_HOURLY_RATE = '100'

interface Props {
  invertLabel?: boolean
}

export const Rate = ({ invertLabel = true }: Props): JSX.Element => {
  return (
    <InputBlock
      invertLabel={invertLabel}
      store="rate"
      max={6}
      title="Rate per hour"
      defaultValue={DEFAULT_HOURLY_RATE}
    />
  )
}
