import { useEditUserForm } from '@/features/users/hooks'
import { CommonUserFields } from '../CommonUserFields/CommonUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import { EditPasswordFields } from './EditPasswordFields/EditPasswordFields'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import type { User } from '@/features/users/types'
import styles from '../UsersModal.module.scss'

type EditUserFormProps = {
    formId: string
    user?: User | null
    onSubmit: (data: UpdateUserFormValues) => void
}

export const EditUserForm = ({ formId, user, onSubmit }: EditUserFormProps) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useEditUserForm(user)

    return (
        <form
            className={styles.form}
            id={formId}
            onSubmit={handleSubmit(onSubmit)}
        >
            >
                <CommonUserFields />
                <EditPasswordFields />
                <AvatarField />
            </form>
    )
}
