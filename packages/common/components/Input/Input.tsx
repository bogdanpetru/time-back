import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{
  hasFocus?: boolean
  hasValue?: boolean
  error?: string
}>`
  position: relative;
  display: flex;
  padding: 0 6px;
  margin-bottom: 20px;
  border-bottom: ${(props) =>
    props.error
      ? props?.theme?.input?.borderBottomError
      : props?.theme?.input?.borderBottom};
  height: ${(props) => props?.theme?.input?.height}px;

  ${(props) => props?.theme?.common}
  background: ${(props) =>
    props?.hasFocus
      ? props?.theme?.input?.background_active
      : props?.theme?.input?.background};
`

const Label = styled.label<{ hasValue?: boolean }>`
  position: absolute;
  left: 8px;
  font-size: ${(props) => props?.theme?.label?.fontSize}px;
  transition: top 100ms;
  cursor: text;
  ${(props) =>
    props.hasValue
      ? 'top: 3px;'
      : `
    top: 13px;
    font-size: ${props.theme.label.fontSizeWithValue}px;
  `}

  color: ${(props) => props?.theme?.label?.color};
`

const Error = styled.span`
  position: absolute;
  top: calc(100% + 2px);
  font-size: 0.8em;
  right: 0;
  color: ${(props) => props.theme?.input?.errorColor};
`

const InputInner = styled.input`
  flex: 1;
  font-size: ${(props) => props?.theme?.input?.fontSize}px;
  border: 0;
  background: none;
  padding-top: 19px;
  &:focus {
    outline: 0;
  }
`
interface InputProps {
  label: string
  required?: boolean
  onChange: (value: string) => void
  defaultValue?: string
  value?: string
  type: string
  className?: string
  style?: object
  error?: string
  name?: string
  autofocus?: boolean
}

const Input = (props: InputProps) => {
  const [hasFocus, setHasFocus] = useState(false)
  const [localValue, setValue] = useState<string>(props.defaultValue || '')
  const inputRef = useRef<HTMLInputElement>()

  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])
  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.value
      props?.onChange(newValue)
      setValue(newValue)
    },
    [props.onChange]
  )

  const focus = () => inputRef?.current?.focus()

  const handleLabelClick = focus

  const value = props.value || localValue

  useEffect(() => {
    if (props.autofocus) {
      focus()
    }
  }, [props.autofocus])

  return (
    <Wrapper
      error={props.error}
      style={props.style}
      className={props.className}
      hasFocus={hasFocus}
      hasValue={Boolean(value)}
    >
      {props.label && (
        <Label onClick={handleLabelClick} hasValue={hasFocus || Boolean(value)}>
          {props.label}
        </Label>
      )}
      <InputInner
        ref={inputRef}
        name={props.name}
        type={props.type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      />
      {props.error && <Error>{props.error}</Error>}
    </Wrapper>
  )
}

Input.defaultProps = {
  type: 'text',
}

export default Input
