export const isNumber = (number: any): boolean =>
  !isNaN(number) && typeof number === 'number'
