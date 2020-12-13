import styled from 'styled-components';
import Text from './Text';

const Error = styled(Text)`
  color: ${props => props?.theme?.error?.color};
`;

export default Error;