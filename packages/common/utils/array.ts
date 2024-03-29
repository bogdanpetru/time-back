export const addArray = (arr: number[]): number =>
  arr?.reduce((acc: number, item: number): number => acc + item, 0) || 0

export const last = <T>(collection: T[]): T =>
  Array.isArray(collection) ? collection[collection.length - 1] : null
