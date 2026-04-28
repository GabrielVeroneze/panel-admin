import { CommonProductFields } from '@/features/products/components'
import styles from './CreateProductForm.module.scss'

type CreateProductFormProps = {
    formId: string
    onSubmit: (data: any) => void
}

export const CreateProductForm = ({
    formId,
    onSubmit,
}: CreateProductFormProps) => {
    return (
        <form className={styles.form} id={formId}>
            <CommonProductFields />
        </form>
    )
}
