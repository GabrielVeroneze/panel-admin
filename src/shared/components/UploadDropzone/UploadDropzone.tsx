import {
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
    type ReactNode,
} from 'react'
import type { FieldControlProps } from '@/shared/types'
import clsx from 'clsx'
import styles from './UploadDropzone.module.scss'

type UploadDropzoneProps = {
    onFileSelect?: (files: File | File[]) => void
    accept?: string
    multiple?: boolean
    children?: ReactNode
    className?: string
} & FieldControlProps

export const UploadDropzone = ({
    id,
    status,
    onFileSelect,
    accept,
    multiple,
    children,
    className,
}: UploadDropzoneProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const handleFile = (files: File[]) => {
        if (!onFileSelect) return

        if (multiple) {
            onFileSelect(files)
        } else {
            onFileSelect(files[0])
        }
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)

        const files = Array.from(event.dataTransfer.files || [])

        if (files.length) handleFile(files)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || [])

        if (files.length) handleFile(files)
    }

    return (
        <div
            className={clsx(
                styles.dropzone,
                isDragging && styles.dragging,
                status && styles[status],
                className,
            )}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
        >
            <input
                className={styles.input}
                id={id}
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                multiple={multiple}
            />
            {children}
        </div>
    )
}
