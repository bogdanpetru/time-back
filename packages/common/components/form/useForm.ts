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

interface FormInterface {
  [key: string]: {
    value: any
    onChange: (value: any) => void
    error?: string
  }
}

const useForm = ({
  initialValues, // note: needs to be static, fields cannot be added/removed with this model
  validators,
  onSubmit,
}: UseFormInterface): FormInterface => {
  const keys = Object.keys(initialValues).sort() || []
  const fields = {}

  return keys.reduce((acc: FormInterface, key: string) => {
    const [value, setValue] = useState<any>(initialValues[key])
    const error =
      typeof validators[key] === 'function' ? validators[key](value) : void 0

    acc[key] = {
      value,
      onChange: setValue,
      error,
    }

    return acc
  }, {})
}

export default useForm
