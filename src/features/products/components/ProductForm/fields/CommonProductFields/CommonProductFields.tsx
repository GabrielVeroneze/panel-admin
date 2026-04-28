import { FormField, Input, Textarea, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
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
            <FormField id="price" label="Price" size="large">
                <Input
                    className={styles.input}
                    type="number"
                    placeholder="Enter price"
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
                />
            </FormField>
            <FormField
                className={styles.dropzoneField}
                id="images"
                size="large"
            >
                <UploadDropzone accept="image/*" onFileSelect={() => {}}>
                    <PhotographIcon className={styles.icon} />
                    <span className={styles.text}>Drop files to upload</span>
                </UploadDropzone>
            </FormField>
        </>
    )
}
