import { useContext, useState } from "react";
import styled from "styled-components";
import {
  LogoSmall,
  LogoTextBig,
  Input,
  Button,
  GoogleLogo,
  TransparentButton,
  ErrorText,
  Loader,
} from "@app/components";
import { t } from "@app/data/intl";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "@app/data/auth";

const Wrapper = styled.div`
  position: relative;
  padding-top: 74px;
  max-width: 300px;
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

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Auth = () => {
  const auth = useContext(AuthContext);
  const [signingInProgress, setSigninLoading] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();

  if (auth.isUserSignedIn()) {
    return <Redirect to="/" />;
  }

  if (signingInProgress) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  const handleSignUp = (
    signUpFn: (email: string, password: string) => Promise<any>
  ) => async () => {
    setSigninLoading(true);
    try {
      await signUpFn(email, password);
      history.push("/");
    } catch (error) {
      if (error && error.message) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(t("Failed to sign in."));
      }
    } finally {
      setSigninLoading(false);
    }
  };

  const handleSignInWithGoogle = handleSignUp(auth.signInWithGoogle);
  const handleSignUpWithEmail = handleSignUp(auth.signUpWithEmail);
  const handleSignInWithEmail = handleSignUp(auth.signInWithEmail);
  const buttonsDisabled = !email || !password;

  console.log("errorMessage", errorMessage);

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
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Wrapper>
  );
};

export default Auth;
