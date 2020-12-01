export function setIfDefiend<T>(that: T, values: object) {
  for (const [key, value] of Object.entries(values)) {
    if (typeof value !== undefined) {
      that[key] = value;
    }
  }
}
