import styles from './UserAvatar.module.scss'

type UserAvatarProps = {
    src: string
    alt?: string
    size?: number
    asButton?: boolean
    onClick?: () => void
}

export const UserAvatar = ({
    src,
    alt = 'Avatar do usuário',
    size = 32,
    asButton = true,
    onClick,
}: UserAvatarProps) => {
    const Tag = asButton ? 'button' : 'div'

    return (
        <Tag
            className={styles.button}
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
        </Tag>
    )
}
