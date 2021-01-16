import { useState, FunctionComponent } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {
  LogoSmall,
  LogoTextBig,
  Input,
  Button,
  GoogleLogo,
  TransparentButton,
  ErrorText,
  Loader,
} from '@app/components'
import { t } from '@app/data/intl'

import {
  isUserSignedIn,
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
} from '@app/data/auth'

const Wrapper = styled.div`
  position: relative;
  padding-top: 74px;
  max-width: 300px;
  margin: 0 auto;
`

const LogoWrapper = styled.div`
  text-align: center;
  flex: 1;
  margin-bottom: 60px;
  svg {
    display: inline-block;
  }
`

const LogoGraphWrapper = styled(LogoWrapper)`
  margin-bottom: 47px;
`

const InputWrapper = styled.div`
  margin-bottom: 48px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto 87px;
`

const SocialWrapper = styled.div`
  align-items: center;
  max-width: 155px;
  margin: 0 auto;
  text-align: center;
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Auth: FunctionComponent = () => {
  const [signingInProgress, setSignInLoading] = useState(false)
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const history = useHistory()

  if (isUserSignedIn()) {
    return <Redirect to="/" />
  }

  if (signingInProgress) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  }

  const handleSignUp = (
    signUpFn: (
      email: string,
      password: string
    ) => Promise<any>
  ) => async () => {
    setSignInLoading(true)
    try {
      await signUpFn(email, password)
      history.push('/')
    } catch (error) {
      if (error && error.message) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(t('Failed to sign in.'))
      }
    } finally {
      setSignInLoading(false)
    }
  }

  const handleSignInWithGoogle = handleSignUp(signInWithGoogle)
  const handleSignUpWithEmail = handleSignUp(signUpWithEmail)
  const handleSignInWithEmail = handleSignUp(signInWithEmail)
  const buttonsDisabled = !email || !password

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
          label={t('email')}
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

      <ButtonWrapper>
        <Button
          disabled={buttonsDisabled}
          onClick={handleSignInWithEmail}
          primary
        >
          {t('login')}
        </Button>
        <Button
          disabled={buttonsDisabled}
          onClick={handleSignUpWithEmail}
          primary
        >
          {t('signup')}
        </Button>
      </ButtonWrapper>
      <SocialWrapper>
        <TransparentButton onClick={handleSignInWithGoogle}>
          <GoogleLogo />
        </TransparentButton>
      </SocialWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Wrapper>
  )
}

export default Auth
