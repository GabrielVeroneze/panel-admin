import type { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'
import styles from './Card.module.scss'

type CardProps<T extends ElementType = 'div'> = {
    as?: T
} & ComponentPropsWithoutRef<T>

export const Card = <T extends ElementType = 'div'>({
    children,
    as,
    className,
    ...props
}: CardProps<T>) => {
    const Component = as || 'div'

    return (
        <Component className={clsx(styles.card, className)} {...props}>
            {children}
        </Component>
    )
}
