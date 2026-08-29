import { useNavigate } from 'react-router'
import { useAuth } from '@/features/auth/hooks'
import {
    Dropdown,
    DropdownDivider,
    DropdownItem,
    IconButton,
    Input,
    UserAvatar,
} from '@/shared/components'
import {
    BellSolidIcon,
    CogSolidIcon,
    LogoutIcon,
    SearchIcon,
    TrashSolidIcon,
    UserSolidIcon,
} from '@/shared/assets/icons'
import type { AuthUser } from '@/features/auth/types'
import styles from './AuthenticatedHeader.module.scss'

type AuthenticatedHeaderProps = {
    user: AuthUser
}

export const AuthenticatedHeader = ({ user }: AuthenticatedHeaderProps) => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = async () => {
        try {
            await logout()

            navigate('/auth/sign-in')
        } catch {
            return
        }
    }

    return (
        <div className={styles.container}>
            <Input
                className={styles.input}
                icon={<SearchIcon />}
                placeholder="Search"
                size="medium"
            />
            <div className={styles.actions}>
                <IconButton
                    icon={<BellSolidIcon />}
                    aria-label="Notificações"
                />
                <Dropdown
                    trigger={<UserAvatar src={user.avatar} asButton={false} />}
                >
                    <DropdownItem disabled>
                        <div className={styles.userInfo}>
                            <strong>{user.name}</strong>
                            <span>{user.email}</span>
                        </div>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem
                        icon={<UserSolidIcon />}
                        onClick={() => navigate('/profile')}
                    >
                        Your Profile
                    </DropdownItem>
                    <DropdownItem
                        icon={<CogSolidIcon />}
                        onClick={() => navigate('/settings')}
                    >
                        Settings
                    </DropdownItem>
                    <DropdownItem icon={<LogoutIcon />} onClick={handleLogout}>
                        Sign out
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem icon={<TrashSolidIcon />} variant="danger">
                        Delete
                    </DropdownItem>
                </Dropdown>
            </div>
        </div>
    )
}
