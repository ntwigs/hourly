import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '@theme'
import { GlobalStyle } from '@theme/global-style'
import { Onboarding } from '@pages/onboarding'
import { Start } from '@pages/start'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Start />
      <Onboarding />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
