import styled from 'styled-components'

interface TitleProps {
  center?: boolean
}

const Title = styled.h2<TitleProps>`
  font-size: 33px;
  margin-bottom: 66px;
  color: ${(props) => props?.theme?.title?.color};
  ${(props) => (props.center ? 'text-align: center' : '')};
`

export default Title
