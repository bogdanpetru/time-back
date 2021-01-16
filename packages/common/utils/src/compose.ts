/**
 * Compose left-to-right
 *
 * To complicated to proper type a compose function.
 * I do not want to use an external lib only for this.
 * @param fns functions to compose
 */
const compose = <T>(...fns: ((arg: T) => T)[]) => (arg: T): T =>
  fns.reduce((acc: T, fn) => fn(acc), arg)

export default compose
