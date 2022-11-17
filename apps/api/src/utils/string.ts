export const strSubstitute = (str: string, ...obj: (string | number)[]) => {
  let countIndex = -1
  const regex = /\{\}/g
  return str.replace(regex, () => {
    countIndex++
    return `${obj[countIndex]}`
  })
}

export const normalizeString = (str: string) => {
  const regex = /[^\u0E00-\u0E7Fa-zA-Z0-9]/g
  return str.replace(regex, '').toLowerCase().trim()
}
