import { FormProvider } from 'react-hook-form'
import { useEditUserForm } from '@/features/users/hooks'
import { CommonUserFields } from '../CommonUserFields/CommonUserFields'
import { AvatarField } from '../AvatarField/AvatarField'
import { EditPasswordFields } from './EditPasswordFields/EditPasswordFields'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import type { User } from '@/features/users/types'
import styles from './EditUserForm.module.scss'

type EditUserFormProps = {
    formId: string
    user?: User | null
    onSubmit: (data: UpdateUserFormValues) => void
}

export const EditUserForm = ({ formId, user, onSubmit }: EditUserFormProps) => {
    const methods = useEditUserForm(user)

    return (
        <FormProvider {...methods}>
            <form
                className={styles.form}
                id={formId}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommonUserFields />
                <EditPasswordFields />
                <AvatarField />
            </form>
        </FormProvider>
    )
}
