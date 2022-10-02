import React from 'react'
import ReactDOM from 'react-dom'
import { Content } from '..'
import { ThemeProvider } from 'styled-components'
import { theme } from '@theme'
import { getSibling } from './get-sibling'
import { Selectors } from './selectors'
import { isElement } from '@utils/is-element'
import { Intersect } from '@components/intersect'
import { setTimerPosition } from './set-timer-position'

interface Node extends Selectors {
  node: Element
}

const config = {
  childList: true,
  subtree: true,
  characterData: true,
}

const HOURLY_ROOT = 'hourly-root'
const DURATION_QUERY = '.time-format-utils__duration'
const TOTAL_DURATION_QUERY = '.css-8iioa1-TotalTimeCounter'

const getElements = ({ node }: Pick<Node, 'node'>): readonly HTMLElement[] => {
  const durations = node.querySelectorAll(DURATION_QUERY)
  const totalDurations = node.querySelectorAll(TOTAL_DURATION_QUERY)
  const durationArray = Array.from(durations) as HTMLElement[]
  const totalDurationsArray = Array.from(totalDurations) as HTMLElement[]
  return [...durationArray, ...totalDurationsArray]
}

const observeTime =
  ({ node }: Pick<Node, 'node'>) =>
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

interface SetDefaultTime {
  node: Element
}

const setDefaultTime =
  ({ node }: SetDefaultTime) =>
  (): string => {
    return node?.firstElementChild?.textContent || ''
  }

interface AddToTasks extends Node, Selectors {}

export const addToDom = ({ node, selector }: AddToTasks): void => {
  const elements = getElements({ node })

  elements.forEach((element) => {
    const [parent, sibling] = getSibling({ selector, element })
    if (!isElement(parent) || !isElement(sibling)) return

    const hasExistingRoot = getHasExistingRoot({ element: sibling })
    if (hasExistingRoot || !isElement(element.parentElement)) return

    const result = element.parentElement.classList.contains(
      'css-e7gbcr-innerControlStyles-DayListControls'
    )

    const timeObserver = result
      ? observeTime({ node: element })
      : observeTime({ node: element.parentElement })

    const root = document.createElement('div')
    root.className = HOURLY_ROOT

    if (element.classList.contains(TOTAL_DURATION_QUERY.slice(1))) {
      setTimerPosition({ element: root })
    }

    parent.insertAdjacentElement('beforebegin', root)

    const getDefaultTime = result ? () => element.textContent || '' : setDefaultTime({ node: element.parentElement })

    ReactDOM.render(
      <React.StrictMode>
        <Intersect>
          <ThemeProvider theme={theme}>
            <Content
              getDefaultTime={getDefaultTime}
              timeObserver={timeObserver}
              isTimer={selector === 'timer'}
            />
          </ThemeProvider>
        </Intersect>
      </React.StrictMode>,
      root
    )
  })
}
