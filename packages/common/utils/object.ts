export const removeUndefinedKeys = <T>(obj: { [key: string]: any }): T =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof key === 'string' && value !== undefined) {
      acc[key] = value
    }
    return acc
  }, {} as any)
