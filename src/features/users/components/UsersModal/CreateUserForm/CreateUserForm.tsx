import { FormProvider } from 'react-hook-form'
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
    const methods = useCreateUserForm()

    return (
        <FormProvider {...methods}>
            <form
                className={styles.form}
                id={formId}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommonUserFields />
                <CreatePasswordFields />
                <AvatarField />
            </form>
        </FormProvider>
    )
}
