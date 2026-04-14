import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { CreateUserForm } from '@/features/users/components'
import type { CreateUserFormValues } from '@/features/users/schemas'
import styles from './CreateUserModal.module.scss'

type CreateUserModalProps = {
    open: boolean
    onCreate: (data: CreateUserFormValues) => void
    onClose: () => void
}

export const CreateUserModal = ({
    open,
    onCreate,
    onClose,
}: CreateUserModalProps) => {
    const formId = 'user-form'

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader title="Create user" onClose={onClose} />
            <ModalContent>
                <CreateUserForm formId={formId} onSubmit={onCreate} />
            </ModalContent>
            <ModalFooter>
                <Button
                    className={styles.button}
                    form={formId}
                    type="submit"
                    variant="primary"
                    size="lg"
                >
                    Save
                </Button>
                <Button
                    className={styles.button}
                    variant="danger"
                    size="lg"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
