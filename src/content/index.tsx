import React from 'react'
import ReactDOM from 'react-dom'
import { Content } from '../pages/content'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'
import { GlobalStyle } from '../theme/global-style'

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
          const elements = targetNode.querySelector(
            "*[data-heap-id='timer-page-list']"
          )

          if (elements) {
            observer.disconnect()
            const test = elements!.firstElementChild!.firstElementChild

            ReactDOM.render(
              <React.StrictMode>
                <ThemeProvider theme={theme}>
                  <GlobalStyle />
                  <Content />
                </ThemeProvider>
              </React.StrictMode>,
              test
            )
          }
        }
      }
    })
  }

  const observer = new MutationObserver(callback)

  if (targetNode) {
    observer.observe(targetNode!, config)
  }
})()
