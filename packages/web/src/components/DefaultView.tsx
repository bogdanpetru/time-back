import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { LogoText, Title, TransparentButton, Footer } from '@app/components'

const DefaultViewWrapper = styled.div`
  padding-top: 10px;
`
const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const DefaultView: FunctionComponent<{
  title?: string
  footer?: React.ReactElement
}> = (props) => {
  const history = useHistory()

  const logoClick = () => {
    history.push('/')
  }

  return (
    <DefaultViewWrapper>
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
