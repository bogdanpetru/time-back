import styled from 'styled-components';

const Text = styled.div`
  color: ${props => props?.theme?.text?.color};
  font-size: ${props => props?.theme?.text?.fontSize};
`;

export default Text;