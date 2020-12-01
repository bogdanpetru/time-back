import React, { useContext } from "react";

interface InputProps {
  label: string;
  onChange: (value: string) => void;
}

const getStyle = (theme: { inputBackground: string }) => ({
  background: theme.inputBackground,
  border: 'none',
});

const Input = (props: InputProps) => {
  return (
    <div>
      {props.label}
      coae
      <input />
    </div>
  );
};

export default Input;
