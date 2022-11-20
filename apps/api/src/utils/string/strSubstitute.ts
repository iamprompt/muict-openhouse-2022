export const strSubstitute = (str: string, ...obj: (string | number)[]) => {
  let countIndex = -1
  const regex = /\{\}/g
  return str.replace(regex, () => {
    countIndex++
    return `${obj[countIndex]}`
  })
}
