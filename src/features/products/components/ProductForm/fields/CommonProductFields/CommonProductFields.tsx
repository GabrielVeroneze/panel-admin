import { FormField, Input, Textarea } from '@/shared/components'
import { ImagesField } from '@/features/products/components'
import styles from './CommonProductFields.module.scss'

export const CommonProductFields = () => {
    return (
        <>
            <FormField id="product-name" label="Product Name" size="large">
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter product name"
                    size="large"
                />
            </FormField>
            <FormField id="category" label="Category" size="large">
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter category"
                    size="large"
                />
            </FormField>
            <FormField id="brand" label="Brand" size="large">
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Enter brand"
                    size="large"
                />
            </FormField>
            <FormField
                className={styles.textareaField}
                id="details"
                label="Details"
                size="large"
            >
                <Textarea
                    className={styles.textarea}
                    placeholder="Enter product details"
                    size="large"
                />
            </FormField>
            <ImagesField />
        </>
    )
}
