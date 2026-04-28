import { FormField, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import styles from './ImagesField.module.scss'

export const ImagesField = () => {
    return (
        <FormField className={styles.dropzoneField} id="images" size="large">
            <UploadDropzone accept="image/*" onFileSelect={() => {}}>
                <PhotographIcon className={styles.icon} />
                <span className={styles.text}>Drop files to upload</span>
            </UploadDropzone>
        </FormField>
    )
}
