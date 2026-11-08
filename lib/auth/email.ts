const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Shared by the client-side e-mail step and the server action that guards it. */
export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value)
}
