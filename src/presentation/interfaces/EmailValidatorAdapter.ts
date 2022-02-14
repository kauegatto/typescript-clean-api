export interface EmailValidatorAdapter {
  isValid: (email: string) => boolean
}
