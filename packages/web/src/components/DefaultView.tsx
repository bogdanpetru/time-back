import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
  LogoText,
  Title,
  TransparentButton,
  Footer,
  BackIcon,
  QuitIcon,
} from '@app/components'
import { signOut } from '@app/data/auth'

const DefaultViewWrapper = styled.div`
  position: relative;
  max-width: 460px;
  margin: 0 auto;
  padding: 10px;
`
const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const BackButton = styled(TransparentButton)`
  position: absolute;
  top: 24px;
  left: 0;
`

const SignOutButton = styled(TransparentButton)`
  position: absolute;
  top: 24px;
  right: 0;
`

const DefaultView: FunctionComponent<{
  title?: string
  footer?: React.ReactElement
  className?: string
}> = (props) => {
  const history = useHistory()
  const isHome = history.location.pathname === '/'

  const logoClick = () => {
    history.push('/')
  }

  const onSignOut = async () => {
    await signOut()
    history.push('/login')
  }

  return (
    <DefaultViewWrapper className={props.className}>
      {!isHome && (
        <BackButton onClick={() => history.goBack()}>
          <BackIcon />
        </BackButton>
      )}
      <SignOutButton onClick={onSignOut}>
        <QuitIcon />
      </SignOutButton>
      <LogoWrapper>
        <TransparentButton onClick={logoClick}>
          <LogoText />
        </TransparentButton>
      </LogoWrapper>
      {props.title && <Title center>{props.title}</Title>}
      {props.children}
      {props.footer && <Footer>{props.footer}</Footer>}
    </DefaultViewWrapper>
  )
}

export default DefaultView
