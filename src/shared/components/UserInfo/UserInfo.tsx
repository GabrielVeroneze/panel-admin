import { UserAvatar } from '@/shared/components'
import clsx from 'clsx'
import styles from './UserInfo.module.scss'

type UserInfoProps = {
    name: string
    email: string
    avatarUrl: string
    variant?: 'sm' | 'md'
}

const avatarSizeByVariant = {
    sm: 28,
    md: 0,
}

export const UserInfo = ({
    name,
    email,
    avatarUrl,
    variant = 'md',
}: UserInfoProps) => {
    const avatarSize = avatarSizeByVariant[variant]

    return (
        <div className={clsx(styles.container, styles[variant])}>
            <UserAvatar src={avatarUrl} size={avatarSize} alt={name} />
            <div className={styles.text}>
                <span className={styles.name}>{name}</span>
                <span className={styles.email}>{email}</span>
            </div>
        </div>
    )
}
