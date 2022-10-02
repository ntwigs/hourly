import { isElement } from '@utils/is-element'
import { Selectors } from './selectors'

interface Parent {
  parent?: HTMLElement | null
}

const getElements = ({ parent }: Parent): readonly Element[] => {
  if (isElement(parent) && isElement(parent?.previousElementSibling)) {
    return [parent, parent.previousElementSibling]
  }

  return []
}

interface GetSibling extends Selectors {
  element: HTMLElement
}

const dayListSelector = 'css-e7gbcr-innerControlStyles-DayListControls'

export const getSibling = ({
  selector,
  element,
}: GetSibling): readonly Element[] => {
  if (selector === 'timer') {
    const parent = element?.parentElement?.parentElement
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

  if (element.parentElement?.classList.contains(dayListSelector)) {
    return getElements({ parent: element })
  }

  return getElements({ parent: element.parentElement })
}
