import React from 'react'
import ReactDOM from 'react-dom'
import { Content } from '../pages/content'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

const config = {
  childList: true,
  subtree: true,
}

const HOURLY_ROOT = 'hourly-root'
const DURATION_QUERY = '.time-format-utils__duration'
const BILLABLE_QUERY = '*[title="Billable"]'
const NON_BILLABLE_QUERY = '*[title="Non-billable"]'
const CONTENT_QUERY = '*[data-heap-id="timer-page-list"]'

interface Node {
  node: Element
}

const addToLoadedTasks =
  ({ node }: Node): MutationCallback =>
  (mutations): void => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'childList') return
      addToTasks({ node })
    })
  }

const getElements = ({ node }: Node): Element[] => {
  const billable = node.querySelectorAll(BILLABLE_QUERY)
  const nonbillable = node.querySelectorAll(NON_BILLABLE_QUERY)
  return [...Array.from(billable), ...Array.from(nonbillable)]
}

const observeTime =
  ({ node }: Node) =>
  (fn: MutationCallback) => {
    const observer = new MutationObserver(fn)
    observer.observe(node, config)
  }

interface AddToTasks extends Node {
  isTimer?: boolean
}

const addToTasks = ({ node, isTimer }: AddToTasks): void => {
  const elements = getElements({ node })

  elements.forEach((element) => {
    const sibling = isTimer
      ? element?.parentElement?.nextElementSibling
      : element?.nextElementSibling

    if (!sibling) return
    if (sibling.classList.value === HOURLY_ROOT) return

    const time = sibling.querySelector(DURATION_QUERY)
    if (!time) return

    const timeObserver = observeTime({ node: time.parentElement! })

    const root = document.createElement('div')
    root.className = HOURLY_ROOT

    isTimer
      ? element.parentElement?.insertAdjacentElement('afterend', root)
      : element.insertAdjacentElement('afterend', root)

    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Content
            defaultTime={time.textContent || ''}
            timeObserver={timeObserver}
          />
        </ThemeProvider>
      </React.StrictMode>,
      root
    )
  })
}

const observeTasks = ({ node }: Node): void => {
  addToTasks({ node })
  const observer = new MutationObserver(addToLoadedTasks({ node }))
  observer.observe(node, config)
}

const addToTimer = ({ node }: Node): void => {
  addToTasks({ node, isTimer: true })
}

const callback: MutationCallback = (mutations, observer) => {
  let hasFoundTimer = false

  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const timer = document.querySelector(CONTENT_QUERY)

      if (timer && !hasFoundTimer) {
        hasFoundTimer = true
        const timerSection = timer.firstElementChild
        const taskSection = timer.lastElementChild

        observeTasks({ node: taskSection! })
        addToTimer({ node: timerSection! })

        observer.disconnect()
      }
    }
  })
}

const addToToggl = () => {
  const targetNode = document.body

  if (targetNode) {
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
  }
}

addToToggl()
