import styled from 'styled-components';

interface TitleProps {
  center?: boolean;
}

const Title = styled.h2<TitleProps>`
  font-size: 24px;
  margin-bottom: 30px;
  color: ${props => props?.theme?.title?.color};
  ${props => props.center ? 'text-align: center' : ''}

`;

export default Title