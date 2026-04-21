import { EyeSolidIcon } from '@/shared/assets/icons'
import styles from './UsersFooterInfo.module.scss'

export const UsersFooterInfo = () => {
    return (
        <>
            <span className={styles.text}>
                Last account activity:{' '}
                <strong className={styles.time}>2 hours ago</strong>
            </span>
            <EyeSolidIcon className={styles.icon} />
        </>
    )
}
