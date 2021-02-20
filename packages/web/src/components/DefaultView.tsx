import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import {
  LogoText,
  Title,
  TransparentButton,
  Footer,
  BackIcon,
  MenuItem,
  Menu,
} from '@app/components'
import { signOut } from '@app/data/auth'
import { t } from '@app/data/intl'

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

const MenuWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
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
  const isNew = history.location.pathname === '/new'

  const goHome = () => {
    history.push('/')
  }

  const onNewProject = () => {
    history.push('/new')
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
      <MenuWrapper>
        <Menu>
          <MenuItem isActive={isHome} onClick={goHome}>
            {t('projects')}
          </MenuItem>
          <MenuItem isActive={isNew} onClick={onNewProject}>
            {t('new project')}
          </MenuItem>
          <MenuItem onClick={onSignOut}>{t('sign out')}</MenuItem>
        </Menu>
      </MenuWrapper>
      <LogoWrapper>
        <TransparentButton onClick={goHome}>
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
