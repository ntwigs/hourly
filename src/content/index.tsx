import { hasElements } from '../utils/has-elements'
import { isChildList } from '../utils/is-child-list'
import { isElement } from '../utils/is-element'
import { addToDom } from './add-to-dom'
import { Selectors } from './selectors'

const config = {
  childList: true,
  subtree: true,
}

const CONTENT_QUERY = '*[data-heap-id="timer-page-list"]'

interface Node extends Selectors {
  node: Element
}

const addToLoadedTasks =
  ({ node, selector }: Node): MutationCallback =>
  (mutations): void => {
    mutations.filter(isChildList).forEach(() => {
      addToDom({ node, selector })
    })
  }

const observeTasks = ({ node }: Node): void => {
  const selector = 'entry'
  addToDom({ node, selector })
  const observer = new MutationObserver(addToLoadedTasks({ node, selector }))
  observer.observe(node, config)
}

const addToTimer = ({ node, selector }: Node): void => {
  addToDom({ node, selector })
}

const callback: MutationCallback = (mutations, observer) => {
  const childList = document.querySelector(CONTENT_QUERY)

  if (childList) {
    const timer = document.querySelector(CONTENT_QUERY)
    const timerSection = timer?.firstElementChild
    const taskSection = timer?.lastElementChild

    if (isElement(taskSection)) {
      observeTasks({ node: taskSection, selector: 'entry' })
    }

    if (isElement(timerSection)) {
      addToTimer({ node: timerSection, selector: 'timer' })
    }

    observer.disconnect()
  }
}

const addToToggl = () => {
  const targetNode = document.body

  if (targetNode) {
    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)
  }
}

addToToggl()
