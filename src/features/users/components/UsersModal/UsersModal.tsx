import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import { CreateUserForm, EditUserForm } from '@/features/users/components'
import type { User } from '@/features/users/types'
import type {
    CreateUserFormValues,
    UpdateUserFormValues,
} from '@/features/users/schemas'
import styles from './UsersModal.module.scss'

type UsersModalProps = {
    open: boolean
    user?: User | null
    onClose: () => void
    onCreate: (data: CreateUserFormValues) => void
    onUpdate: (data: UpdateUserFormValues) => void
    onDelete?: () => void
}

export const UsersModal = ({
    open,
    user,
    onClose,
    onCreate,
    onUpdate,
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
                {isEditing ? (
                    <EditUserForm
                        key={user?.id}
                        formId={formId}
                        user={user}
                        onSubmit={onUpdate}
                    />
                ) : (
                    <CreateUserForm formId={formId} onSubmit={onCreate} />
                )}
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
