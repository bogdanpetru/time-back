import React from 'react'
import { ThemeProvider } from 'styled-components'
import { primary } from '@app/theme';
import { Input, LogoSmall, LogoTextBig } from '@app/components'


function App() {
  return (
    <ThemeProvider theme={primary}>
      <LogoSmall />
      <LogoTextBig />
      <Input onChange={console.log} label="test" />
      <h1>hello world</h1>
    </ThemeProvider>
  )
}

export default App
