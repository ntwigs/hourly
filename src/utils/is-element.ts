export const isElement = (element: unknown): element is Element => {
  return element !== null && typeof element !== 'undefined'
}
