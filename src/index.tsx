import React from 'react'
import ReactDOM from 'react-dom'
import { Start } from './pages/start'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyle } from './theme/global-style'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Start />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
