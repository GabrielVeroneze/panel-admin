import { AuthenticatedHeader } from './AuthenticatedHeader/AuthenticatedHeader'
import { GuestHeader } from './GuestHeader/GuestHeader'
import { LogoImage } from '@/shared/images'
import styles from './Header.module.scss'

type HeaderProps = {
    isAuthenticated: boolean
}

export const Header = ({ isAuthenticated }: HeaderProps) => {
    return (
        <header className={styles.header}>
            <LogoImage />
            {isAuthenticated ? <AuthenticatedHeader /> : <GuestHeader />}
        </header>
    )
}
