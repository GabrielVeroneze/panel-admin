import { FormField, UploadDropzone } from '@/shared/components'
import { PhotographIcon } from '@/shared/assets/icons'
import styles from './AvatarField.module.scss'

type AvatarFieldProps = {
    onFileSelect: (file: File | undefined) => void
    error?: string
}

export const AvatarField = ({ onFileSelect, error }: AvatarFieldProps) => {
    return (
        <FormField
            className={styles.dropzoneField}
            id="avatar"
            size="large"
            status={error ? 'error' : undefined}
            message={error}
        >
            <UploadDropzone accept="image/*" onFileSelect={onFileSelect}>
                <PhotographIcon className={styles.icon} />
                <span className={styles.text}>
                    Drop files to upload your profile picture
                </span>
            </UploadDropzone>
        </FormField>
    )
}
