import React from "react";

// theming
import { ThemeProvider } from "styled-components";
import { primary } from "@app/theme";
import styled from "styled-components";

// routing
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from './views/Auth';
import Projects from './views/Projects';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function App() {
  return (
    <Router>
      <ThemeProvider theme={primary}>
        <Container>
          <Switch>
          <Route path="/login">
            <Auth />
          </Route>
          <Route path="/">
            <Projects />
          </Route>
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
