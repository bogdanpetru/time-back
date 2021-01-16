export const isNumber = (number: any): boolean =>
  !isNaN(number) && typeof number === 'number'

export const clamp = (min: number, max: number) => (value: number): number => {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}
