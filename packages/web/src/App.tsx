import React from "react";
import styled, { createGlobalStyle} from "styled-components";

// theming
import { ThemeProvider } from "styled-components";
import { primary } from "@app/theme";

// routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// views
import Auth from "./views/Auth";
import Projects from "./views/Projects";
import ProtectedRoute from './components/ProtectedRoute';
import { initAuth } from '@app/data/auth';

initAuth();

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const GlobalStyle = createGlobalStyle`
  html {
    ${primary.common}
  }
`;

function App() {
  return (
    <ThemeProvider theme={primary}>
      <GlobalStyle />
      <Container>
        <Router>
          <Switch>

            <Route path="/login">
              <Auth />
            </Route>

            <ProtectedRoute path="/">
              <Projects />
            </ProtectedRoute>


          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
