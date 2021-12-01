import { isElement } from '../utils/is-element'
import { Selectors } from './selectors'

interface Parent {
  parent?: Element | null
}

const getElements = ({ parent }: Parent): readonly Element[] => {
  if (isElement(parent) && isElement(parent?.previousElementSibling)) {
    return [parent, parent?.previousElementSibling]
  }

  return []
}

interface SumPosition {
  element: HTMLElement
}

const setSumPositionElement = ({ element }: SumPosition) => {
  const onChange = () => {
    const isDesktop = window.matchMedia('(min-width: 1024px)')
    element.style.width = isDesktop.matches ? '196px' : '110px'
    isDesktop.addEventListener('change', onChange, { once: true })
  }
  return onChange
}

interface GetSibling extends Selectors {
  element: Element
}

export const getSibling = ({
  selector,
  element,
}: GetSibling): readonly Element[] => {
  if (selector === 'timer') {
    const parent = element?.parentElement?.parentElement?.parentElement
    return getElements({ parent })
  }

  if (selector === 'entry') {
    const parent =
      element?.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement

    const hasClasses = !!parent?.classList.value

    if (hasClasses) {
      return getElements({ parent })
    }
  }

  const parent = element?.parentElement
  if (isElement(parent)) {
    parent.style.textAlign = 'right'
    const setSumPosition = setSumPositionElement({ element: parent })
    setSumPosition()
  }
  return getElements({ parent })
}
