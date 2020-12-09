import styled from 'styled-components';


const Button = styled.button`
  border: 0;
  background-color: transparent;

  :focus, :active {
    outline: none;
  }
  :focus {
    cursor: pointer;
  }
`;

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const TransparentButton = (props: ButtonProps) => (
  <Button onClick={props.onClick}>{props.children}</Button>
);

export default TransparentButton