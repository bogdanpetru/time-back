export const removeUndefinedKeys = <T>(obj: { [key: string]: any }): T =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof key === 'string' && value !== undefined && value !== null) {
      let preparedValue = value
      if (typeof preparedValue === 'object' && !Array.isArray(preparedValue)) {
        preparedValue = removeUndefinedKeys(preparedValue)
      }
      acc[key] = preparedValue
    }
    return acc
  }, {} as any)
