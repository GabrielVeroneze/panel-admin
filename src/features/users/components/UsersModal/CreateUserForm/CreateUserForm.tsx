import { useCreateUserForm } from '@/features/users/hooks'
import { CommonUserFields } from '../CommonUserFields/CommonUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import { CreatePasswordFields } from './CreatePasswordFields/CreatePasswordFields'
import type { CreateUserFormValues } from '@/features/users/schemas'
import styles from '../UsersModal.module.scss'

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
            >
                <CommonUserFields />
                <CreatePasswordFields />
                <AvatarField />
            </form>
    )
}
