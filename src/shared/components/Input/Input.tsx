import type { ComponentProps } from 'react'
import styles from './Input.module.scss'

type InputProps = ComponentProps<'input'>

export const Input = ({ className, ...props }: InputProps) => {
    return <input className={`${styles.input} ${className}`} {...props} />
}
