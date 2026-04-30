import { FormProvider } from 'react-hook-form'
import { useCreateProductForm } from '@/features/products/hooks'
import { CommonProductFields } from '@/features/products/components'
import type { CreateProductFormValues } from '@/features/products/schemas'
import styles from './CreateProductForm.module.scss'

type CreateProductFormProps = {
    formId: string
    onSubmit: (data: CreateProductFormValues) => void
}

export const CreateProductForm = ({
    formId,
    onSubmit,
}: CreateProductFormProps) => {
    const methods = useCreateProductForm()

    return (
        <FormProvider {...methods}>
            <form
                className={styles.form}
                id={formId}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <CommonProductFields />
            </form>
        </FormProvider>
    )
}
