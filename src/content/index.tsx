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

const addToTasks = ({ node }: Node): void => {
  const billable = node.querySelectorAll(BILLABLE_QUERY)
  const nonbillable = node.querySelectorAll(NON_BILLABLE_QUERY)
  const elements = [...Array.from(billable), ...Array.from(nonbillable)]

  elements.forEach((element) => {
    const sibling = element?.nextElementSibling

    if (!sibling) return
    if (sibling.classList.value === HOURLY_ROOT) return

    const time = sibling.querySelector(DURATION_QUERY)?.textContent

    if (!time) return

    const root = document.createElement('div')
    root.className = HOURLY_ROOT

    element.insertAdjacentElement('afterend', root)

    ReactDOM.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <Content time={time} />
        </ThemeProvider>
      </React.StrictMode>,
      root
    )
  })
}

const observeTasks = ({ node }: Node): void => {
  addToTasks({ node })
  console.log('this should trigger once')
  const observer = new MutationObserver(addToLoadedTasks({ node }))
  observer.observe(node, config)
}

const addToTimer = ({ node }: Node): void => {
  console.log('found timer')
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
