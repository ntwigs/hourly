export const isNumber = (value: unknown): value is number => {
  if (!value) {
    return false
  }

  const valueAsNumber = +(value as string)

  if (valueAsNumber === Infinity || isNaN(valueAsNumber)) {
    return false
  }

  return typeof +(value as string) === 'number'
}
