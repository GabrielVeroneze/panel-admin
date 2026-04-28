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
                    placeholder="Apple Imac 27”"
                    size="large"
                />
            </FormField>
            <FormField id="category" label="Category" size="large">
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Electronics"
                    size="large"
                />
            </FormField>
            <FormField id="brand" label="Brand" size="large">
                <Input
                    className={styles.input}
                    type="text"
                    placeholder="Apple"
                    size="large"
                />
            </FormField>
            <FormField id="price" label="Price" size="large">
                <Input
                    className={styles.input}
                    type="number"
                    placeholder="$2999"
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
                    placeholder="
                        Standart Glass
                        3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz
                        8GB 2666MHz DDR4 memory
                        Radeon Pro 5500 XT with 8GB of GDDR6 memory
                        512GB SSD storage
                        Gigabit Ethernet
                        Magic Mouse 2
                        Magic Keyboard - US
                    "
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
