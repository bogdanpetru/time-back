import { useContext, useState, useCallback } from "react";
import styled, { ThemeContext } from "styled-components";

interface WrapperProps {
  hasFocus?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  padding: 6px;
  border-bottom: ${props => props?.theme?.input?.border_bottom};
  background: ${(props) =>
    props?.hasFocus
      ? props?.theme?.input?.background_active
      : props?.theme?.input?.background};
`;

const InputInner = styled.input`
  flex: 1;
  height: ${(props) => props?.theme?.input?.height}px;
  border: 0;
  background: none;
  &:focus {
    outline: 0;
  }
`;

interface InputProps {
  label: string;
  onChange: (value: string) => void;
}

const Input = (props: InputProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus]);
  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus]);

  return (
    <Wrapper hasFocus={hasFocus}>
      <InputInner onFocus={handleFocus} onBlur={handleBlur} />
    </Wrapper>
  );
};

export default Input;
