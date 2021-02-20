import styled from 'styled-components'
import TransparentButton from '../TransparentButton'

const MenuItem = styled(TransparentButton)<{ isActive?: boolean }>`
  font-size: 24px;
  padding: 6px 12px;
  text-align: left;
  color: ${(props) => props?.theme?.menu?.color};
  ${(props) =>
    props.isActive
      ? `background-color: ${props?.theme?.menu?.activeBackground};`
      : ''}
  :hover {
    background-color: ${(props) => props?.theme?.menu?.hoverBackground};
  }
`
export default MenuItem
