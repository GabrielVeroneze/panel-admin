import { Controller } from 'react-hook-form'
import { useCreateUserForm } from '@/features/users/hooks'
import { BaseUserFields } from '../BaseUserFields/BaseUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import type { CreateUserFormValues } from '@/features/users/schemas'
import styles from './CreateUserForm.module.scss'

type CreateUserFormProps = {
    formId: string
    onSubmit: (data: CreateUserFormValues) => void
}

export const CreateUserForm = ({ formId, onSubmit }: CreateUserFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useCreateUserForm()

    return (
        <form
            className={styles.form}
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
        >
            <BaseUserFields register={register} errors={errors} />
            >
            <Controller
                name="avatar"
                control={control}
                render={({ field }) => (
                    <AvatarField
                        onFileSelect={field.onChange}
                        error={errors.avatar?.message}
                    />
                )}
            />
        </form>
    )
}
