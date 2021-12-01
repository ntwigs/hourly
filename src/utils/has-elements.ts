export const hasElements = (value: unknown): value is readonly unknown[] => {
  return Array.isArray(value) && value.length > 0
}
