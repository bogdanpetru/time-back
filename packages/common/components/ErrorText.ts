import styled from 'styled-components'
import Text from './Text'

const ErrorText = styled(Text)`
  color: ${(props) => props?.theme?.error?.color};
`

export default ErrorText
