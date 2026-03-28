import type { ReactNode } from 'react'
import styles from './ModalContent.module.scss'

type ModalContentProps = {
    children: ReactNode
}

export const ModalContent = ({ children }: ModalContentProps) => {
    return <div className={styles.content}>{children}</div>
}
