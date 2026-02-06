import styles from './UserAvatar.module.scss'

type UserAvatarProps = {
    src: string
    alt?: string
    size?: number
    onClick?: () => void
}

export const UserAvatar = ({
    src,
    alt = 'Avatar do usuário',
    size = 32,
    onClick,
}: UserAvatarProps) => {
    return (
        <button
            className={styles.button}
            type="button"
            aria-label={alt}
            onClick={onClick}
            style={{ height: size, width: size }}
        >
            <img
                className={styles.image}
                src={src}
                alt={alt}
                height={size}
                width={size}
            />
        </button>
    )
}
