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

interface FieldInterface {
  value: any
  onChange: (value: any) => void
  error?: string
}

interface FormInterface {
  [key: string]: FieldInterface
  onSubmit: () => void
}

const useForm = ({
  initialValues, // note: needs to be static, fields cannot be added/removed with this model
  validators,
  onSubmit,
}: UseFormInterface): FormInterface => {
  const keys = Object.keys(initialValues).sort() || []
  const config = {}

  const fields = keys.reduce((acc: {[key: string]: FieldInterface}, key: string) => {
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

  return {
    onSubmit: () => {},
    ..fields,
  }
}

export default useForm
