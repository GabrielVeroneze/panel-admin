import { FormField, Input, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import { useUserForm } from '@/features/users/hooks'
import type { User } from '@/features/users/types'
import type { UserFormValues } from '@/features/users/schemas'
import styles from './UsersForm.module.scss'

type UsersFormProps = {
    formId: string
    user?: User | null
    onSubmit: (data: UserFormValues) => void
}

export const UsersForm = ({ formId, user, onSubmit }: UsersFormProps) => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useUserForm({ user })

    return (
        <form
            className={styles.form}
            id={formId}
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
                    onFileSelect={(file) =>
                        setValue('avatar', file, {
                            shouldValidate: true,
                        })
                    }
                >
                    <PhotographIcon className={styles.icon} />
                    <span className={styles.text}>
                        Drop files to upload your profile picture
                    </span>
                </UploadDropzone>
            </FormField>
        </form>
    )
}
