import { AuthenticatedHeader } from './AuthenticatedHeader/AuthenticatedHeader'
import { GuestHeader } from './GuestHeader/GuestHeader'
import { IconButton } from '@/shared/components'
import { MenuAlt1SolidIcon } from '@/shared/assets/icons'
import { LogoImage } from '@/shared/assets/images'
import { useBreakpoint } from '@/shared/hooks'
import { useAuth } from '@/features/auth/hooks'
import styles from './Header.module.scss'

type HeaderProps = {
    onToggleSidebar?: () => void
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
    const { user, authenticated } = useAuth()
    const { isMobile, isTablet } = useBreakpoint()
    const showMenuButton = isMobile || isTablet

    return (
        <header className={styles.header}>
            <LogoImage className={styles.logo} />
            {showMenuButton && (
                <IconButton
                    icon={<MenuAlt1SolidIcon />}
                    aria-label="Abrir menu"
                    size={28}
                    onClick={onToggleSidebar}
                />
            )}
            {authenticated && user ? (
                <AuthenticatedHeader user={user} />
            ) : (
                <GuestHeader />
            )}
        </header>
    )
}
