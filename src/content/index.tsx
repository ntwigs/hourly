import React from 'react'
import ReactDOM from 'react-dom'
import { Content } from '../pages/content'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'
import { GlobalStyle } from '../theme/global-style'

const HOURLY_ROOT = 'hourly-root'

// @ts-ignore
;(() => {
  const config = {
    childList: true,
    subtree: true,
  }

  const targetNode = document.querySelector('body')

  const callback = (mutations: any[]) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        if (targetNode) {
          const billable = targetNode.querySelectorAll('*[title="Billable"]')
          const nonbillable = targetNode.querySelectorAll(
            '*[title="Non-billable"]'
          )

          const elements = [...Array.from(billable), ...Array.from(nonbillable)]

          elements.forEach((element) => {
            if (element) {
              observer.disconnect()
              const node = element

              if (node.nextElementSibling?.classList.value !== HOURLY_ROOT) {
                const root = document.createElement('div')
                root.className = HOURLY_ROOT

                node.insertAdjacentElement('afterend', root)

                ReactDOM.render(
                  <React.StrictMode>
                    <ThemeProvider theme={theme}>
                      <GlobalStyle />
                      <Content />
                    </ThemeProvider>
                  </React.StrictMode>,
                  root
                )
              }
            }
          })
        }
      }
    })
  }

  const observer = new MutationObserver(callback)

  if (targetNode) {
    observer.observe(targetNode!, config)
  }
})()
