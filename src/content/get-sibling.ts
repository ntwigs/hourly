import { isElement } from '../utils/is-element'
import { Selectors } from './selectors'

interface Parent {
  parent?: Element | null
}

const getElements = ({ parent }: Parent): Element[] => {
  if (isElement(parent) && isElement(parent?.previousElementSibling)) {
    return [parent, parent?.previousElementSibling]
  }

  return []
}

interface GetSibling extends Selectors {
  element: Element
}

export const getSibling = ({ selector, element }: GetSibling): Element[] => {
  if (selector === 'timer') {
    const parent = element?.parentElement?.parentElement?.parentElement
    return getElements({ parent })
  }

  if (selector === 'entry') {
    const parent =
      element?.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement
    return getElements({ parent })
  }

  if (selector === 'summary') {
    const parent =
      element?.parentElement?.parentElement?.parentElement?.parentElement
        ?.parentElement
    return getElements({ parent })
  }

  return []
}
