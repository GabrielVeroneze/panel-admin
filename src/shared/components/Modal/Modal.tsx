import { useEffect, useRef, type ReactNode } from 'react'
import styles from './Modal.module.scss'

type ModalProps = {
    open: boolean
    onClose: () => void
    children: ReactNode
}

export const Modal = ({ open, onClose, children }: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return

        if (open) {
            dialog.showModal()
        } else {
            dialog.close()
        }
    }, [open])

    return (
        <dialog
            className={styles.modal}
            ref={ref}
            onClose={onClose}
            onClick={(e) => {
                if (e.target === ref.current) onClose()
            }}
        >
            {children}
        </dialog>
    )
}
