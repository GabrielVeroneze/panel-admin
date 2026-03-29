import {
    Button,
    FormField,
    Input,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import type { User } from '@/features/users/types'
import styles from './UsersModal.module.scss'

type UsersModalProps = {
    open: boolean
    user?: User | null
    onClose: () => void
    onSubmit: () => void
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

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader
                title={isEditing ? 'Edit user' : 'Create user'}
                onClose={onClose}
            />
            <ModalContent>
                <form className={styles.form}>
                    <FormField id="first-name" label="First Name" size="large">
                        <Input
                            type="text"
                            placeholder="Enter first name"
                            size="large"
                        />
                    </FormField>
                    <FormField id="last-name" label="Last Name" size="large">
                        <Input
                            type="text"
                            placeholder="Enter last name"
                            size="large"
                        />
                    </FormField>
                    <FormField id="email" label="Email" size="large">
                        <Input
                            type="email"
                            placeholder="Enter email address"
                            size="large"
                        />
                    </FormField>
                    <FormField id="phone" label="Phone number" size="large">
                        <Input
                            type="text"
                            placeholder="Enter phone number +(123) 456 7890"
                            size="large"
                        />
                    </FormField>
                    <FormField id="company" label="Company" size="large">
                        <Input
                            type="text"
                            placeholder="Enter company name"
                            size="large"
                        />
                    </FormField>
                    <FormField id="department" label="Department" size="large">
                        <Input
                            type="text"
                            placeholder="Enter department name"
                            size="large"
                        />
                    </FormField>
                    <FormField
                        id="current-password"
                        label="Current Password"
                        size="large"
                    >
                        <Input
                            type="password"
                            placeholder="Enter current password"
                            size="large"
                        />
                    </FormField>
                    <FormField
                        id="new-password"
                        label="New Password"
                        size="large"
                    >
                        <Input
                            type="password"
                            placeholder="Enter new password"
                            size="large"
                        />
                    </FormField>
                </form>
            </ModalContent>
            <ModalFooter>
                <Button variant="primary" size="lg" onClick={onSubmit}>
                    Save
                </Button>
                {isEditing ? (
                    <Button
                        variant="danger"
                        size="lg"
                        iconPosition="left"
                        icon={<XSolidIcon />}
                        onClick={onDelete}
                    >
                        Delete account
                    </Button>
                ) : (
                    <Button variant="danger" size="lg" onClick={onClose}>
                        Cancel
                    </Button>
                )}
            </ModalFooter>
        </Modal>
    )
}
