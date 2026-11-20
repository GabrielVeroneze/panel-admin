import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { CreateUserForm } from '@/features/users/components'
import type { CreateUserFormValues } from '@/features/users/schemas'
import styles from '@/styles/modules/modal.module.scss'

type CreateUserModalProps = {
    open: boolean
    loading: boolean
    error: string | null
    onCreate: (data: CreateUserFormValues) => void
    onClose: () => void
}

export const CreateUserModal = ({
    open,
    loading,
    error,
    onCreate,
    onClose,
}: CreateUserModalProps) => {
    const formId = 'user-form'

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader title="Create user" onClose={onClose} />
            <ModalContent>
                <CreateUserForm
                    formId={formId}
                    error={error}
                    onSubmit={onCreate}
                />
            </ModalContent>
            <ModalFooter>
                <Button
                    className={styles.button}
                    form={formId}
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                >
                    Save
                </Button>
                <Button
                    className={styles.button}
                    variant="danger"
                    size="lg"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
