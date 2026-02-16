import { AuthenticatedHeader } from './AuthenticatedHeader/AuthenticatedHeader'
import { GuestHeader } from './GuestHeader/GuestHeader'
import { IconButton } from '@/shared/components'
import { MenuAlt1SolidIcon } from '@/shared/icons'
import { LogoImage } from '@/shared/images'
import { useBreakpoint } from '@/shared/hooks'
import styles from './Header.module.scss'

type HeaderProps = {
    isAuthenticated: boolean
    onToggleSidebar?: () => void
}

export const Header = ({ isAuthenticated, onToggleSidebar }: HeaderProps) => {
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
            {isAuthenticated ? <AuthenticatedHeader /> : <GuestHeader />}
        </header>
    )
}
