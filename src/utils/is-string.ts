export const isString = (value: unknown): value is string => {
  if (!value) {
    return false
  }

  return typeof value === 'string'
}
