import React from "react";

// theming
import { ThemeProvider } from "styled-components";
import { primary } from "@app/theme";
import styled from "styled-components";

// routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// views
import Auth from "./views/Auth";
import Projects from "./views/Projects";
import ProtectedRoute from './components/ProtectedRoute';

import { initializeFirebase } from '@app/data/firebase';

initializeFirebase();

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function App() {
  return (
    <ThemeProvider theme={primary}>
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
