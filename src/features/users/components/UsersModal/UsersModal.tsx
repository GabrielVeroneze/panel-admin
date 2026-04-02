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
import { useUserForm } from '@/features/users/hooks'
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

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useUserForm({ user })

    return (
        <Modal open={open} onClose={onClose}>
            <ModalHeader
                title={isEditing ? 'Edit user' : 'Create user'}
                onClose={onClose}
            />
            <ModalContent>
                <form
                    className={styles.form}
                    id="user-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormField
                        id="first-name"
                        label="First Name"
                        size="large"
                        status={errors.firstName && 'error'}
                        message={errors.firstName?.message}
                    >
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter first name"
                            size="large"
                            {...register('firstName')}
                        />
                    </FormField>
                    <FormField
                        id="last-name"
                        label="Last Name"
                        size="large"
                        status={errors.lastName && 'error'}
                        message={errors.lastName?.message}
                    >
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter last name"
                            size="large"
                            {...register('lastName')}
                        />
                    </FormField>
                    <FormField
                        id="email"
                        label="Email"
                        size="large"
                        status={errors.email && 'error'}
                        message={errors.email?.message}
                    >
                        <Input
                            className={styles.input}
                            type="email"
                            placeholder="Enter email address"
                            size="large"
                            {...register('email')}
                        />
                    </FormField>
                    <FormField
                        id="phone"
                        label="Phone number"
                        size="large"
                        status={errors.phone && 'error'}
                        message={errors.phone?.message}
                    >
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter phone number +(123) 456 7890"
                            size="large"
                            {...register('phone')}
                        />
                    </FormField>
                    <FormField
                        id="company"
                        label="Company"
                        size="large"
                        status={errors.company && 'error'}
                        message={errors.company?.message}
                    >
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter company name"
                            size="large"
                            {...register('company')}
                        />
                    </FormField>
                    <FormField
                        id="department"
                        label="Department"
                        size="large"
                        status={errors.department && 'error'}
                        message={errors.department?.message}
                    >
                        <Input
                            className={styles.input}
                            type="text"
                            placeholder="Enter department name"
                            size="large"
                            {...register('department')}
                        />
                    </FormField>
                    <FormField
                        id="current-password"
                        label="Current Password"
                        size="large"
                        status={errors.currentPassword && 'error'}
                        message={errors.currentPassword?.message}
                    >
                        <Input
                            className={styles.input}
                            type="password"
                            placeholder="Enter current password"
                            size="large"
                            {...register('currentPassword')}
                        />
                    </FormField>
                    <FormField
                        id="new-password"
                        label="New Password"
                        size="large"
                        status={errors.newPassword && 'error'}
                        message={errors.newPassword?.message}
                    >
                        <Input
                            className={styles.input}
                            type="password"
                            placeholder="Enter new password"
                            size="large"
                            {...register('newPassword')}
                        />
                    </FormField>
                    <FormField
                        className={styles.dropzoneField}
                        id="avatar"
                        size="large"
                        status={errors.avatar && 'error'}
                        message={errors.avatar?.message}
                    >
                        <UploadDropzone
                            accept="image/*"
                            onFileSelect={(file) => setValue('avatar', file)}
                        >
                            <PhotographIcon className={styles.icon} />
                            <span className={styles.text}>
                                Drop files to upload your profile picture
                            </span>
                        </UploadDropzone>
                    </FormField>
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
