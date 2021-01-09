import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { ThemeProvider } from 'styled-components'
import { primary } from '@app/theme'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Projects from './views/Projects'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './views/Auth'

import { useAuth } from '@app/data/auth'
import DataProvider from '@app/data/management/provider'
import { Loader, ToastContainer, DocumentTitle } from '@app/components'

const GlobalStyle = createGlobalStyle`
  html {
    ${primary.common}
  }
`

function App() {
  const { loading } = useAuth({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATA_BASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  })

  if (loading) {
    return <Loader />
  }

  return (
    <Router>
      <ThemeProvider theme={primary}>
        <GlobalStyle />
        <DataProvider>
          <ToastContainer>
            <Switch>
              <Route path="/login">
                <Auth />
              </Route>
              <ProtectedRoute path="/">
                <Projects />
              </ProtectedRoute>
            </Switch>
          </ToastContainer>
        </DataProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
