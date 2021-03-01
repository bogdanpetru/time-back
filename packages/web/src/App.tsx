import { FunctionComponent } from 'react'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { primary } from '@app/theme'
import { useAuth } from '@app/api/auth'
import DataProvider from '@app/data/management/provider'
import { Loader, ToastContainer } from '@app/components'

import Projects from './views/Projects'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './views/Auth'

const GlobalStyle = createGlobalStyle`
  html {
    ${primary.common}
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
`

const App: FunctionComponent = () => {
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
