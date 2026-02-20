import type { ComponentProps } from 'react'
import clsx from 'clsx'
import styles from './Textarea.module.scss'

type TextareaProps = ComponentProps<'textarea'>

export const Textarea = ({ className, ...props }: TextareaProps) => {
    return <textarea className={clsx(styles.textarea, className)} {...props} />
}
