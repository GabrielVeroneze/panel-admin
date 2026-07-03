import { Card } from '@/shared/components'
import type { PropsWithChildren } from 'react'
import styles from './AuthCard.module.scss'

type AuthCardProps = PropsWithChildren<{
    title: string
    image: string
    imageAlt: string
}>

export const AuthCard = ({
    children,
    title,
    image,
    imageAlt,
}: AuthCardProps) => {
    return (
        <Card className={styles.card}>
            <aside className={styles.illustration}>
                <img className={styles.image} src={image} alt={imageAlt} />
            </aside>
            <div className={styles.content}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </div>
        </Card>
    )
}
