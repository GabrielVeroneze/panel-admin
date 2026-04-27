import {
    Button,
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
    onUpdate: (data: UpdateUserFormValues) => void
    onClose: () => void
    onDelete?: () => void
}

export const EditUserModal = ({
    open,
    user,
    onUpdate,
    onClose,
    onDelete,
}: EditUserModalProps) => {
    const formId = 'user-form'

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader title="Edit user" onClose={onClose} />
            <ModalContent>
                <EditUserForm formId={formId} user={user} onSubmit={onUpdate} />
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
                    iconPosition="left"
                    icon={<XSolidIcon />}
                    onClick={onDelete}
                >
                    Delete account
                </Button>
            </ModalFooter>
        </Modal>
    )
}
