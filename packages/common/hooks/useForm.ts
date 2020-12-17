import { useState } from 'react'

interface UseFormInterface {
  initialValues: {
    [index: string]: string
  }
  onSubmit: (values: any) => void
}

interface FormInterface {
  [key: string]: {
    value: any
    onChange: (value: any) => void
  }
}

const useForm = ({
  initialValues,
  onSubmit,
}: UseFormInterface): FormInterface => {
  const fieldsKeys = Object.keys(initialValues).sort() || []
  return fieldsKeys.reduce(
    (
      acc: { [key: string]: { value: string; onChange: (value: any) => any } },
      key: string
    ) => {
      const [value, setValue] = useState<any>(initialValues[key])
      acc[key] = {
        value,
        onChange: setValue,
      }

      return acc
    },
    {}
  )
}

export default useForm
