import React from 'react'

interface IInputProps {
  value: string;
  onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
}

export const Input: React.FunctionComponent<IInputProps> = ({ value, onChange }) => (
  <input type="text" placeholder="Name" value="" onChange={onChange} />
)

interface IFromProps {
  onFormSubmit: (event: React.FormEvent) => void
}

export const Form: React.FunctionComponent<IFromProps> = ({ children, onFormSubmit }) => (
  <form>
    {children}
  </form>
)
