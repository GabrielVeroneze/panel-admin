import {
    Button,
    FormError,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import { EditUserForm } from '@/features/users/components'
import type { User } from '@/features/users/types'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import styles from '@/styles/modules/modal.module.scss'

type EditUserModalProps = {
    open: boolean
    user?: User | null
    loading?: boolean
    error?: string | null
    deleteLoading?: boolean
    deleteError?: string | null
    onUpdate: (data: UpdateUserFormValues) => void
    onClose: () => void
    onDelete?: () => void
}

export const EditUserModal = ({
    open,
    user,
    loading = false,
    error,
    deleteLoading = false,
    deleteError,
    onUpdate,
    onClose,
    onDelete,
}: EditUserModalProps) => {
    const formId = 'user-form'
    const isBusy = loading || deleteLoading

    const handleClose = () => {
        if (isBusy) return

        onClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalHeader title="Edit user" onClose={handleClose} />
            <ModalContent>
                <EditUserForm
                    formId={formId}
                    user={user}
                    error={error}
                    onSubmit={onUpdate}
                />
                <FormError message={deleteError} />
            </ModalContent>
            <ModalFooter>
                <Button
                    className={styles.button}
                    form={formId}
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    disabled={isBusy}
                >
                    Save
                </Button>
                <Button
                    className={styles.button}
                    variant="danger"
                    size="lg"
                    iconPosition="left"
                    icon={<XSolidIcon />}
                    onClick={onDelete}
                    loading={deleteLoading}
                    disabled={isBusy}
                >
                    Delete account
                </Button>
            </ModalFooter>
        </Modal>
    )
}
