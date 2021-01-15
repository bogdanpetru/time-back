import { useState, useEffect } from 'react'

interface InputDescription {
  name: string
  initialValue?: any
  isValid?: Array<(value: any) => string>
}

interface InputInterface {
  value: any
  onChange: (value: any) => void
  error?: string
  silentError?: string
}

interface InputsInterface {
  [key: string]: InputInterface
}

interface UseForm {
  inputs: InputsInterface
  onSubmit: (values: any) => void
  isSubmitted: boolean
}

const getErrors = (
  value: any,
  predicates: Array<(value: any) => string>
): string[] => predicates?.map?.((isValid) => isValid(value)).filter(Boolean)

const useForm = <VALUES>(
  inputDescriptions: InputDescription[],
  onSubmit: (values: VALUES) => void,
  options: { initialValues: { [key: string]: any } } = { initialValues: {} }
): UseForm => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [values, setValues] = useState<{ [key: string]: any }>({})

  const inputs = inputDescriptions.reduce((acc, input) => {
    const value = values[input.name]
    const inputErrors = getErrors(value, input.isValid)
    acc[input.name] = {
      value,
      onChange: (value) =>
        setValues({
          ...values,
          [input.name]: value,
        }),
      [isSubmitted ? 'error' : 'silentError']: inputErrors
        ? inputErrors[0]
        : '',
    }
    return acc
  }, {} as InputsInterface)

  useEffect(() => {
    const initialValues = inputDescriptions.reduce<{ [key: string]: any }>(
      (acc, input) => {
        acc[input.name] = input.initialValue || ''
        return acc
      },
      { ...options.initialValues }
    )
    setValues(initialValues)
  }, [setValues])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isSubmitted) {
      setIsSubmitted(true)
    }

    const hasErrors = inputDescriptions.some((input) =>
      isSubmitted
        ? inputs[input.name]?.error?.length
        : inputs[input.name]?.silentError?.length
    )
    if (hasErrors) {
      return
    }

    onSubmit(values as VALUES)
  }

  return {
    onSubmit: handleSubmit,
    inputs,
    isSubmitted,
  }
}

export default useForm
