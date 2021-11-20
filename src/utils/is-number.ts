export const isNumber = (value: unknown): value is number => {
  if (!value) {
    return false
  }

  return typeof +(value as string) === 'number'
}
