import type { ComponentProps } from 'react'
import styles from './Textarea.module.scss'

type TextareaProps = ComponentProps<'textarea'>

export const Textarea = ({ className, ...props }: TextareaProps) => {
    return <textarea className={`${styles.textarea} ${className}`} {...props} />
}
