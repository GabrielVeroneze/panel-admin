import styles from './FormError.module.scss'

type FormErrorProps = {
    message?: string | null
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null

    return (
        <p className={styles.error} role="alert">
            {message}
        </p>
    )
}
