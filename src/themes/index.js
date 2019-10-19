import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'

export { GlobalStyle } from './GlobalStyle'

const black = '#000000'
const white = '#FFFFFF'

const theme = {
  black,
  white,
  textColor: 'rgba(0, 0, 0, 0.78)',
  backgroundColor: '#FDFFF5',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  navyBlue: '#2377E3',
  hawkesBlue: '#DBE9FF'
}

export default function ThemeProvider({ children }) {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      {children}
    </StyledComponentsThemeProvider>
  )
}
