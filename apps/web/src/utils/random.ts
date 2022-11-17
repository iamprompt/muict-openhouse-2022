export const randomArray = <T>(obj: T[]) => {
  return obj[Math.floor(Math.random() * obj.length)] as T
}
