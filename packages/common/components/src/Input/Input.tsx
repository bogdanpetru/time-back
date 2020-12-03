import { useState, useCallback } from "react";
import styled, { ThemeContext } from "styled-components";

interface WrapperProps {
  hasFocus?: boolean;
  hasValue?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  display: flex;
  padding: 0 6px;
  border-bottom: ${(props) => props?.theme?.input?.border_bottom};
  height: ${(props) => props?.theme?.input?.height}px;

  ${(props) => props?.theme?.common}
  background: ${(props) =>
    props?.hasFocus
      ? props?.theme?.input?.background_active
      : props?.theme?.input?.background};
`;

const InputInner = styled.input`
  flex: 1;
  font-size: ${(props) => props?.theme?.input?.font_size}px;
  border: 0;
  background: none;
  padding-top: 16px;
  &:focus {
    outline: 0;
  }
`;

interface LabelProps {
  hasValue?: boolean;
}

const Label = styled.label<LabelProps>`
  position: absolute;
  left: 8px;
  font-size: ${(props) => props?.theme?.label?.font_size}px;
  transition: top 100ms;
  ${(props) =>
    props.hasValue
      ? "top: 3px;"
      : `
    top: 10px;
    font-size: ${props.theme.label.font_size_with_value}px;
  `}

  color: ${(props) => props?.theme?.label?.color};
`;

interface InputProps {
  label: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  value?: string;
}

const Input = (props: InputProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [localValue, setValue] = useState(props.defaultValue);

  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus]);
  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus]);
  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      props?.onChange(newValue);
      setValue(newValue);
    },
    [props.onChange]
  );

  const value = props.value || localValue;

  return (
    <Wrapper hasFocus={hasFocus} hasValue={Boolean(value)}>
      {props.label && (
        <Label hasValue={hasFocus || Boolean(value)}>{props.label}</Label>
      )}
      <InputInner
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      />
    </Wrapper>
  );
};

export default Input;
