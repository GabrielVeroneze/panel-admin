import { IconButton, Input, UserAvatar } from '@/shared/components'
import { BellSolidIcon } from '@/shared/icons'
import styles from './AuthenticatedHeader.module.scss'

export const AuthenticatedHeader = () => {
    return (
        <div className={styles.container}>
            <Input className={styles.input} />
            <div className={styles.actions}>
                <IconButton icon={<BellSolidIcon />} ariaLabel="Notificações" />
                <UserAvatar src="" />
            </div>
        </div>
    )
}
