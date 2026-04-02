import {
    Button,
    FormField,
    Input,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    UploadDropzone,
} from '@/shared/components'
import { PhotographIcon, XSolidIcon } from '@/shared/assets/icons'
import type { User } from '@/features/users/types'
import type { UserFormValues } from '@/features/users/schemas'
import styles from './UsersModal.module.scss'

type UsersModalProps = {
    open: boolean
    user?: User | null
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

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader
                title={isEditing ? 'Edit user' : 'Create user'}
                onClose={onClose}
            />
            <ModalContent>
                    <FormField id="first-name" label="First Name" size="large">
                <form
                    className={styles.form}
                    id="user-form"
                >
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter first name"
                            size="large"
                        />
                    </FormField>
                    <FormField id="last-name" label="Last Name" size="large">
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter last name"
                            size="large"
                        />
                    </FormField>
                    <FormField id="email" label="Email" size="large">
                        <Input
                            className={styles.input}
                            type="email"
                            placeholder="Enter email address"
                            size="large"
                        />
                    </FormField>
                    <FormField id="phone" label="Phone number" size="large">
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter phone number +(123) 456 7890"
                            size="large"
                        />
                    </FormField>
                    <FormField id="company" label="Company" size="large">
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter company name"
                            size="large"
                        />
                    </FormField>
                    <FormField id="department" label="Department" size="large">
                        <Input
                            className={styles.input}
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
                            className={styles.input}
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
                            className={styles.input}
                            type="password"
                            placeholder="Enter new password"
                            size="large"
                        />
                    </FormField>
                    <UploadDropzone
                        className={styles.dropzone}
                        accept="image/*"
                        onFileSelect={(file) => console.log(file)}
                    >
                        <PhotographIcon className={styles.icon} />
                        <span className={styles.text}>
                            Drop files to upload your profile picture
                        </span>
                    </UploadDropzone>
                </form>
            </ModalContent>
            <ModalFooter>
                <Button
                    className={styles.button}
                    form="user-form"
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
