import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import { UsersForm } from './UsersForm/UsersForm'
import type { UserEntity } from '@/features/users/types'
import type { UserFormValues } from '@/features/users/schemas'
import styles from './UsersModal.module.scss'

type UsersModalProps = {
    open: boolean
    user?: UserEntity | null
    onClose: () => void
    onSubmit: (data: UserFormValues) => void
    onDelete?: () => void
}

export const UsersModal = ({
    open,
    user,
    onClose,
    onSubmit,
    onDelete,
}: UsersModalProps) => {
    const isEditing = Boolean(user)
    const formId = 'user-form'

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader
                title={isEditing ? 'Edit user' : 'Create user'}
                onClose={onClose}
            />
            <ModalContent>
                <UsersForm formId={formId} user={user} onSubmit={onSubmit} />
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
                {isEditing ? (
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
                ) : (
                    <Button
                        className={styles.button}
                        variant="danger"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    )
}
