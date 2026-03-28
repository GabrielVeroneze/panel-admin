import type { ReactNode } from 'react'
import styles from './ModalFooter.module.scss'

type ModalFooterProps = {
    children: ReactNode
}

export const ModalFooter = ({ children }: ModalFooterProps) => {
    return <footer className={styles.footer}>{children}</footer>
}
