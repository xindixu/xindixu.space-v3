export const getSize = (size) => {
  const [number] = size.match(/\d+/g)
  return parseInt(number, 10)
}
