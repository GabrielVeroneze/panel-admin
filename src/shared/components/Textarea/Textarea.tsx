import type { ComponentProps } from 'react'
import type { FieldSize } from '@/shared/types'
import clsx from 'clsx'
import styles from './Textarea.module.scss'

type TextareaProps = ComponentProps<'textarea'> & {
    size?: FieldSize
}

export const Textarea = ({
    size = 'medium',
    className,
    ...props
}: TextareaProps) => {
    return (
        <textarea
            className={clsx(styles.textarea, styles[size], className)}
            {...props}
        />
    )
}
