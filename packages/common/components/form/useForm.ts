import { useState } from 'react'

interface UseFormParams {
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
  isSubmitted: boolean
}

const useForm = ({
  initialValues, // note: needs to be static, fields cannot be added/removed with this model
  validators,
  onSubmit,
}: UseFormParams): FormInterface => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [values, setValues] = useState<Values>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const changeHandlers = Object.keys(initialValues).reduce(
    (acc, key: string) => {
      acc[key] = (value) => {
        const error =
          typeof validators[key] === 'function'
            ? validators[key](value)
            : void 0
        setErrors({
          ...errors,
          [key]: error,
        })
        setValues({
          ...values,
          [key]: value,
        })
      }
      return acc
    },
    {} as ChangeHandlers
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isSubmitted) {
      setIsSubmitted(true)
    }
    onSubmit(values)
  }

  return {
    changeHandlers,
    errors,
    onSubmit: handleSubmit,
    values,
    isSubmitted: isSubmitted,
  }
}

export default useForm
