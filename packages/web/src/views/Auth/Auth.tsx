import styled, { css } from "styled-components";
import {
  LogoSmall,
  LogoTextBig,
  Input,
  Button,
  GoogleLogo,
  FacebookLogo,
  TwitterLogo,
} from "@app/components";

const Wrapper = styled.div`
  padding-top: 74px;
  max-width: 255px;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  text-align: center;
  flex: 1;
  margin-bottom: 60px;
  svg {
    display: inline-block;
  }
`;

const LogoGraphWrapper = styled(LogoWrapper)`
  margin-bottom: 47px;
`;

const InputWrapper = styled.div`
  margin-bottom: 48px;
`;

const ButtonWraper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto 87px;
`;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 155px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Auth = () => {
  return (
    <Wrapper>
      <LogoGraphWrapper>
        <LogoSmall />
      </LogoGraphWrapper>
      <LogoWrapper>
        <LogoTextBig />
      </LogoWrapper>

      <InputWrapper>
        <Input
          style={{ marginBottom: 23 }}
          label="username"
          onChange={console.log}
        />
        <Input label="password" type="password" onChange={console.log} />
      </InputWrapper>

      <ButtonWraper>
        <Button primary>login</Button>
        <Button primary>signup</Button>
      </ButtonWraper>

      <SocialWrapper>
        <GoogleLogo />
        <FacebookLogo />
        <TwitterLogo />
      </SocialWrapper>
    </Wrapper>
  );
};

export default Auth;
