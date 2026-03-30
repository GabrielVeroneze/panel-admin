import { Button, IconButton, Input } from '@/shared/components'
import {
    CogIcon,
    DotsVerticalSolidIcon,
    ExclamationCircleSolidIcon,
    TrashSolidIcon,
    UserAddSolidIcon,
} from '@/shared/assets/icons'
import styles from './UsersToolbar.module.scss'

type UsersToolbarProps = {
    onCreate: () => void
}

export const UsersToolbar = ({ onCreate }: UsersToolbarProps) => {
    return (
        <div className={styles.container}>
            <Input
                className={styles.input}
                size="large"
                placeholder="Search for users"
            />
            <div className={styles.actions}>
                <IconButton icon={<CogIcon />} />
                <IconButton icon={<TrashSolidIcon />} />
                <IconButton icon={<ExclamationCircleSolidIcon />} />
                <IconButton icon={<DotsVerticalSolidIcon />} />
            </div>
            <Button
                className={styles.button}
                icon={<UserAddSolidIcon />}
                iconPosition="left"
                size="lg"
                onClick={onCreate}
            >
                Add User
            </Button>
        </div>
    )
}
