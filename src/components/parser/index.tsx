import styled from 'styled-components'

const Strong = styled.span(({ theme }) => ({
  fontWeight: theme.weight[1],
}))

interface WithBoldProps {
  text: string
}

export const Parser = ({ text }: WithBoldProps): JSX.Element => {
  const textSplitByBold = text.split('*')
  return (
    <>
      {textSplitByBold.map((section, index) => {
        const isBold = index % 2
        return isBold ? <Strong>{section}</Strong> : section
      })}
    </>
  )
}
