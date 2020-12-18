import { useState } from 'react'

interface UseFormInterface {
  initialValues: {
    [index: string]: string
  }
  validators?: {
    // returns the error text
    [index: string]: (value: any) => string
  }
  onSubmit: (values: any) => void
}

interface Errors {
  [key: string]: string
}

interface ChangeHandlers {
  [key: string]: (value: any) => void
}

interface Values {
  [key: string]: string
}

interface FormInterface {
  changeHandlers: ChangeHandlers
  errors: Errors
  onSubmit: (values: any) => void
  values: Values
}

const useForm = ({
  initialValues, // note: needs to be static, fields cannot be added/removed with this model
  validators,
  onSubmit,
}: UseFormInterface): FormInterface => {
  const values = {} as Values
  const errors = {} as Errors
  const changeHandlers = {} as ChangeHandlers

  for (const key of Object.keys(initialValues).sort() || []) {
    const [value, setValue] = useState<any>(initialValues[key])
    const error =
      typeof validators[key] === 'function' ? validators[key](value) : void 0

    values[key] = value
    errors[key] = error
    changeHandlers[key] = setValue
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(values)
  }

  return {
    changeHandlers,
    errors,
    onSubmit: handleSubmit,
    values,
  }
}

export default useForm
