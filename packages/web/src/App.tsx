import React from "react";
import { ThemeProvider } from "styled-components";
import { primary } from "@app/theme";
import {
  Input,
  LogoSmall,
  LogoTextBig,
  Button,
  TwitterLogo,
  GoogleLogo,
  FacebookLogo,
} from "@app/components";

import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

function tmp(str: string[], val1: string): string {
  return `${str.join(",")} - ${val1}`;
}

function App() {
  return (
    <Container>
      <ThemeProvider theme={primary}>
        <Button />
        <Button primary />
        <LogoSmall />
        <LogoTextBig />
        <Input onChange={console.log} label="email" />
      
        <GoogleLogo />
        <FacebookLogo />
        <TwitterLogo />


      </ThemeProvider>
    </Container>
  );
}

export default App;
