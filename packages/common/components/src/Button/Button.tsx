import styled from 'styled-components'

interface ButtonInnerProps {
  primary?: boolean
}

const ButtonInner = styled.button<ButtonInnerProps>`
  min-width: 100px;
  margin: 0 5px;
  color: ${(props) => props?.theme?.button?.color};
  background: ${(props) =>
    props.primary
      ? props?.theme?.button?.primary?.background
      : props?.theme?.button?.secondary?.background};
  font-size: ${(props) => props?.theme?.button?.fontSize}px;
  padding: ${(props) => props?.theme?.button?.padding};
  border: 0;
  border-radius: 3px;
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
`

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
}

const Button = (props: ButtonProps) => {
  return <ButtonInner {...props} />
}

export default Button
