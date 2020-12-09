import styled from "styled-components";
import {
  LogoSmall,
  LogoTextBig,
  Input,
  Button,
  GoogleLogo,
  TransparentButton,
} from "@app/components";
import { t } from '@app/data/intl';
import { isUserSignedIn, signInWithGoogle } from '@app/data/auth/utils';
import { Redirect } from "react-router-dom";
import { useState } from "react";

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
  align-items: center;
  max-width: 155px;
  margin: 0 auto;
  text-align: center;
`;

const LoginText = styled.div`
  margin-right: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Auth = () => {
  const [signinInProgres, setSigninLoading] = useState(false);
  const isAuthenticated = isUserSignedIn();

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

  const handleSignInWithGoogle = async() => {
    setSigninLoading(true);
    await signInWithGoogle();
    setSigninLoading(false);
  };

  return (
    <Wrapper>
      {signinInProgres && 'loading'}
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
        <Button onClick={() => {}} primary>login</Button>
        <Button onClick={() => {}} primary>signup</Button>
      </ButtonWraper>

      <SocialWrapper>
        <LoginText>
          {t('Login with:')}
        </LoginText>
        <TransparentButton onClick={handleSignInWithGoogle}>
          <GoogleLogo />  
        </TransparentButton>
      </SocialWrapper>
    </Wrapper>
  );
};

export default Auth;
