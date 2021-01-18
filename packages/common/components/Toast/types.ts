export interface AddToast {
  ({
    children,
    expireTime,
  }: {
    children: React.ReactElement
    expireTime?: number
  }): { close: () => void }
}
