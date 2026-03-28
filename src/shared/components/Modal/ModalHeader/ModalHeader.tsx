import { IconButton } from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import styles from './ModalHeader.module.scss'

type ModalHeaderProps = {
    title: string
    onClose: () => void
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
    return (
        <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <IconButton
                aria-label="Close modal"
                icon={<XSolidIcon />}
                size={22}
                onClick={onClose}
            />
        </header>
    )
}
