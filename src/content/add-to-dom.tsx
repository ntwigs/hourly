import React from 'react'
import ReactDOM from 'react-dom'
import { Content } from '../pages/content'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'
import { getSibling } from './get-sibling'
import { Selectors } from './selectors'
import { isElement } from '../utils/is-element'

interface Node extends Selectors {
  node: Element
}

const config = {
  childList: true,
  subtree: true,
}

const HOURLY_ROOT = 'hourly-root'
const DURATION_QUERY = '.time-format-utils__duration'

const getElements = ({ node }: Node): Element[] => {
  const durations = node.querySelectorAll(DURATION_QUERY)
  return Array.from(durations)
}

const observeTime =
  ({ node }: Node) =>
  (fn: MutationCallback): MutationObserver => {
    const observer = new MutationObserver(fn)
    observer.observe(node, config)
    return observer
  }

interface ExistingRoot {
  element?: Element | null
}

const getHasExistingRoot = ({ element }: ExistingRoot) => {
  return !element || element.classList.value === HOURLY_ROOT
}
interface AddToTasks extends Node, Selectors {}

export const addToDom = ({ node, selector }: AddToTasks): void => {
  const elements = getElements({ node, selector })

  elements.forEach((element) => {
    const [parent, sibling] = getSibling({ selector, element })
    if (!isElement(parent) || !isElement(sibling)) return

    const hasExistingRoot = getHasExistingRoot({ element: sibling })
    if (hasExistingRoot) return

    if (!isElement(element.parentElement)) return
    const timeObserver = observeTime({ node: element.parentElement, selector })

    const root = document.createElement('div')
    root.className = HOURLY_ROOT

    parent.insertAdjacentElement('beforebegin', root)

    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Content
            defaultTime={element.textContent || ''}
            timeObserver={timeObserver}
          />
        </ThemeProvider>
      </React.StrictMode>,
      root
    )
  })
}
