import {
    useRef,
    useState,
    type ChangeEvent,
    type DragEvent,
    type ReactNode,
} from 'react'
import type { FieldStatus } from '@/shared/types'
import clsx from 'clsx'
import styles from './UploadDropzone.module.scss'

type UploadDropzoneProps = {
    id?: string
    status?: FieldStatus
    onFileSelect?: (file: File) => void
    accept?: string
    children?: ReactNode
    className?: string
}

export const UploadDropzone = ({
    id,
    status,
    onFileSelect,
    accept,
    children,
    className,
}: UploadDropzoneProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState<boolean>(false)

    const handleFile = (file: File) => {
        onFileSelect?.(file)
    }

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        setIsDragging(false)

        const file = event.dataTransfer.files?.[0]
        if (file) handleFile(file)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) handleFile(file)
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
            />
            {children}
        </div>
    )
}
