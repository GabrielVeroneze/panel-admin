import type { ComponentProps } from 'react'
import type { FieldControlProps, FieldSize } from '@/shared/types'
import clsx from 'clsx'
import styles from './Textarea.module.scss'

type TextareaProps = ComponentProps<'textarea'> & {
    size?: FieldSize
} & FieldControlProps

export const Textarea = ({
    size = 'medium',
    status,
    className,
    disabled,
    ...props
}: TextareaProps) => {
    return (
        <textarea
            className={clsx(
                styles.textarea,
                styles[size],
                status && styles[status],
                disabled && styles.disabled,
                className,
            )}
            {...props}
        />
    )
}
