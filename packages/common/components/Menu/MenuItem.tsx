import styled from 'styled-components'
import TransparentButton from '../TransparentButton'

const MenuItem = styled(TransparentButton)`
  font-size: 16px;
  padding: 6px 12px;
  text-align: left;
  color: ${(props) => props?.theme?.menu?.color};
  :hover {
    background-color: ${(props) => props?.theme?.menu?.aciveBackground};
  }
`
export default MenuItem
