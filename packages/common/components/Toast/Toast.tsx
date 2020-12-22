import styled from 'styled-components'

const Toast = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme?.toast?.background};
  color: ${(props) => props.theme?.toast?.color};
`

export default Toast
