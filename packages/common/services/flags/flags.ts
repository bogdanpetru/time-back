export const isActive = (flag: string) =>
  (localStorage.getItem('flags') || '').split(',').includes(flag)
