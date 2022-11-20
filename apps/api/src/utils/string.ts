export const normalizeString = (str: string) => {
  const regex = /[^\u0E00-\u0E7Fa-zA-Z0-9]/g
  return str.replace(regex, '').toLowerCase().trim()
}
