import { IconButton } from '@/shared/components'
import { TrashSolidIcon } from '@/shared/assets/icons'
import styles from './ImagesPreview.module.scss'

type ImagesPreviewProps = {
    files: File[]
    onRemove: (index: number) => void
}

export const ImagesPreview = ({ files, onRemove }: ImagesPreviewProps) => {
    if (!files.length) return null

    return (
        <div className={styles.container}>
            {files.map((file, index) => {
                const url = URL.createObjectURL(file)

                return (
                    <div key={index} className={styles.item}>
                        <img
                            className={styles.image}
                            src={url}
                            alt={file.name}
                        />
                        <IconButton
                            className={styles.button}
                            icon={<TrashSolidIcon />}
                            onClick={() => onRemove(index)}
                        />
                    </div>
                )
            })}
        </div>
    )
}
