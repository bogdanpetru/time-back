export const isNumber = (number: any): boolean =>
  !isNaN(number) && typeof number === 'number'

export const clamp = (value: number, min: number, max: number) => {
  if (value < min) {
    return min
  }
  if (value > max) {
    return max
  }
  return value
}
