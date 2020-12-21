import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { LogoText, Title } from '@app/components'

const DefaultViewWrapper = styled.div`
  padding-top: 10px;
`
const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const DefaultView: FunctionComponent<{ title?: string }> = (props) => (
  <DefaultViewWrapper>
    <LogoWrapper>
      <LogoText />
    </LogoWrapper>
    {props.title && <Title center>{props.title}</Title>}
    {props.children}
  </DefaultViewWrapper>
)

export default DefaultView
