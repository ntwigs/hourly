export const hasElements = (value: unknown): value is unknown[] => {
  return Array.isArray(value) && value.length > 0
}
