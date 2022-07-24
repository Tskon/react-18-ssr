export const required = (value: string) => {
  return Boolean(value.trim().length)
}

const emailRegExp = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/
export const email = (value: string) => {
  return emailRegExp.test(value.trim())
}

export const minLength = (value: string, num?: number) => {
  if (!num) return false
  return value.trim().length >= num
}

const passwordStrengthRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
export const password = (value: string) => {
  if (!value) return
  return passwordStrengthRegExp.test(value.trim())
}

const phoneRegExp = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
export const phone = (value: string) => {
  if (!value) return
  return phoneRegExp.test(value.trim())
}

const telegramRegExp = /^@.{4,63}$/
export const telegram = (value: string) => {
  if (!value) return
  const trimmedValue = value.trim()
  return telegramRegExp.test(trimmedValue) || phoneRegExp.test(trimmedValue)
}

const urlRegExp = /^([(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|localhost)\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/
export const url = (value: string) => {
  if (!value) return
  return urlRegExp.test(value.trim())
}
