export type ValidationType = 'required'|'email'|'minLength'|'password'|'phone'|'telegram'|'url'
export interface ValidationObjectType {
  type: ValidationType
  value: number
}

export interface FieldsConfig {
  [name: string]: (ValidationType|ValidationObjectType)[]
}

export type ValidationState<Type extends FieldsConfig> = {
  [Name in keyof Type]?: {
      [Validation in ValidationType]?: boolean|null
  }
}
