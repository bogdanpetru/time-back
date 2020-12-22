import { FunctionComponent } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  border: 0;
  background-color: transparent;

  :focus,
  :active {
    outline: none;
  }
  :focus {
    cursor: pointer;
  }
`

interface ButtonProps {
  onClick: (event: React.MouseEvent) => void
  className?: string
  title?: string
}

const TransparentButton: FunctionComponent<ButtonProps> = (props) => (
  <Button
    className={props.className}
    onClick={props.onClick}
    title={props.title}
  >
    {props.children}
  </Button>
)

export default TransparentButton
