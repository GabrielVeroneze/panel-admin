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
    TrashSolidIcon,
    UserSolidIcon,
} from '@/shared/icons'
import styles from './AuthenticatedHeader.module.scss'

export const AuthenticatedHeader = () => {
    return (
        <div className={styles.container}>
            <Input className={styles.input} />
            <div className={styles.actions}>
                <IconButton
                    icon={<BellSolidIcon />}
                    aria-label="Notificações"
                />
                <Dropdown
                    trigger={
                        <UserAvatar src="https://i.pravatar.cc/300?u=a04258213sdfg40fw2" />
                    }
                >
                    <DropdownItem disabled>
                        <div className={styles.userInfo}>
                            <strong>Gabriel Veroneze</strong>
                            <span>gabriel@email.com</span>
                        </div>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem icon={<UserSolidIcon />}>
                        Your Profile
                    </DropdownItem>
                    <DropdownItem icon={<CogSolidIcon />}>
                        Settings
                    </DropdownItem>
                    <DropdownItem icon={<LogoutIcon />}>Sign out</DropdownItem>
                    <DropdownDivider />
                    <DropdownItem icon={<TrashSolidIcon />} variant="danger">
                        Delete
                    </DropdownItem>
                </Dropdown>
            </div>
        </div>
    )
}
