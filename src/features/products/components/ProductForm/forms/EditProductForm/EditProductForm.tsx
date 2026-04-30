import { FormProvider } from 'react-hook-form'
import { useEditProductForm } from '@/features/products/hooks'
import { CommonProductFields } from '@/features/products/components'
import type { UpdateProductFormValues } from '@/features/products/schemas'
import type { Product } from '@/features/products/types'
import styles from './EditProductForm.module.scss'

type EditProductFormProps = {
    formId: string
    product?: Product | null
    onSubmit: (data: UpdateProductFormValues) => void
}

export const EditProductForm = ({
    formId,
    product,
    onSubmit,
}: EditProductFormProps) => {
    const methods = useEditProductForm(product)

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
