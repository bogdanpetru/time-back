import { useContext, useState } from 'react';
import styled from "styled-components";
import {
  LogoSmall,
  LogoTextBig,
  Input,
  Button,
  GoogleLogo,
  TransparentButton,
} from "@app/components";
import { t } from "@app/data/intl";
import { Redirect, useHistory } from "react-router-dom";
import authContext from '../../providers/auth';

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
  const auth = useContext(authContext);
  const [signinInProgres, setSigninLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  if (auth.isUserSignedIn()) {
    return <Redirect to="/" />;
  }

  if (signinInProgres) {
    return <>'we will be back in a moment'</>;
  }

  const handleSignInWithGoogle = async () => {
    setSigninLoading(true);
    await auth.signInWithGoogle();
    setSigninLoading(false);
  };

  const handleSignUpWithEmail = async () => {
    setSigninLoading(true);
    await auth.signUpWithEmail(email, password);
    setSigninLoading(false);
    history.push("/");
  };

  const handleSignInWithEmail = async () => {
    setSigninLoading(true);
    await auth.signInWithEmail(email, password);
    setSigninLoading(false);
    history.push("/");
  };

  const buttonsDisabled = !email || !password;

  
  return (
    <Wrapper>
      {signinInProgres && "loading"}
      <LogoGraphWrapper>
        <LogoSmall />
      </LogoGraphWrapper>
      <LogoWrapper>
        <LogoTextBig />
      </LogoWrapper>

      <InputWrapper>
        <Input
          label={t("email")}
          onChange={setEmail}
          style={{ marginBottom: 23 }}
          type="email"
          value={email}
        />
        <Input
          label="password"
          onChange={setPassword}
          type="password"
          value={password}
        />
      </InputWrapper>

      <ButtonWraper>
        <Button
          disabled={buttonsDisabled}
          onClick={handleSignInWithEmail}
          primary
        >
          {t("login")}
        </Button>
        <Button
          disabled={buttonsDisabled}
          onClick={handleSignUpWithEmail}
          primary
        >
          {t("signup")}
        </Button>
      </ButtonWraper>

      <SocialWrapper>
        <LoginText>{t("Login with:")}</LoginText>
        <TransparentButton onClick={handleSignInWithGoogle}>
          <GoogleLogo />
        </TransparentButton>
      </SocialWrapper>
    </Wrapper>
  );
};

export default Auth;
