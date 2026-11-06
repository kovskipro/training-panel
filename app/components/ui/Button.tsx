import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'schema-picker-btn',
  secondary: 'schema-picker-btn',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant
}

export function Button({ variant, ...props }: ButtonProps) {
  return (
    <button {...props} className={`${variantClasses[variant]} ${props.className ?? ''}`.trim()} data-active={variant === 'primary'} />
  )
}
