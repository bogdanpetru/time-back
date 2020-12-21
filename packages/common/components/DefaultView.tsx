import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { LogoText } from '@app/components'

const DefaultViewWrapper = styled.div`
  padding-top: 10px;
`
const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 80px;
`

const DefaultView: FunctionComponent = (props) => (
  <DefaultViewWrapper>
    <LogoWrapper>
      <LogoText />
    </LogoWrapper>
    {props.children}
  </DefaultViewWrapper>
)

export default DefaultView
