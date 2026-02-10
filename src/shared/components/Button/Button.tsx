import type { ComponentProps, ReactNode } from 'react'
import type {
    ButtonIconPosition,
    ButtonSize,
    ButtonVariant,
} from './Button.types'
import styles from './Button.module.scss'

export type ButtonProps = {
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: ReactNode
    iconPosition?: ButtonIconPosition
} & ComponentProps<'button'>

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'none',
    ...props
}: ButtonProps) => {
    const isIconOnly = icon && iconPosition === 'only'
    const showLeftIcon = icon && iconPosition === 'left'
    const showRightIcon = icon && iconPosition === 'right'
    const showChildren = !isIconOnly

    return (
        <button
            className={`
                ${styles.button}
                ${styles[variant]}
                ${styles[size]}
            `}
            {...props}
        >
            {showLeftIcon && icon}
            {showChildren && children}
            {showRightIcon && icon}
            {isIconOnly && icon}
        </button>
    )
}
