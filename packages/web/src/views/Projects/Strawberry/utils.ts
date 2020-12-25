export const addArray = (arr: number[]): number =>
  arr?.reduce((acc: number, item: number): number => acc + item, 0) || 0

export const last = (collection: any[]): any =>
  Array.isArray(collection) ? collection[collection.length - 1] : null

export const nowInSeconds = (): number => Math.floor(Date.now() / 1000) * 1000
