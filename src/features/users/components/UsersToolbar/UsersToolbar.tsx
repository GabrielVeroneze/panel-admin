import { Button, IconButton, Input } from '@/shared/components'
import {
    CogIcon,
    DocumentDownloadSolidIcon,
    DotsVerticalSolidIcon,
    ExclamationCircleSolidIcon,
    TrashSolidIcon,
} from '@/shared/assets/icons'
import styles from './UsersToolbar.module.scss'

export const UsersToolbar = () => {
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
                size="lg"
                variant="transparent"
                iconPosition="left"
                icon={<DocumentDownloadSolidIcon />}
            >
                Export
            </Button>
        </div>
    )
}
