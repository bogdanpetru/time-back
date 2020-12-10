import styled from "styled-components";

interface ButtonInnerProps {
  primary?: boolean;
}

const ButtonInner = styled.button<ButtonInnerProps>`
  min-width: 100px;
  color: ${(props) => props?.theme?.button?.color};
  background: ${(props) =>
    props.primary
      ? props?.theme?.button?.primary?.background
      : props?.theme?.button?.secondary?.background};
  font-size: ${(props) => props?.theme?.button?.fontSize}px;
  padding: ${(props) => props?.theme?.button?.padding};
  border: 0;
  cursor: pointer;

  :disabled {
    opacity: 0.5;
  }

  :focus {
    outline: none;
  }
  :active {
    background: ${(props) =>
      props.primary
        ? props?.theme?.button?.primary?.activeBackground
        : props?.theme?.button?.secondary?.activeBackground};
  }
`;

interface ButtonProps {
  primary?: boolean;
  children: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  return (
    <ButtonInner {...props}/>
  );
};

export default Button;
