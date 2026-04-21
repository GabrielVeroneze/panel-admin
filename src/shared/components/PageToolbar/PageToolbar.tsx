import { Button, IconButton, Input } from '@/shared/components'
import {
    CogIcon,
    DotsVerticalSolidIcon,
    ExclamationCircleSolidIcon,
    TrashSolidIcon,
    UserAddSolidIcon,
} from '@/shared/assets/icons'
import styles from './PageToolbar.module.scss'

type PageToolbarProps = {
    search: string
    searchPlaceholder: string
    createLabel: string
    onSearchChange: (value: string) => void
    onCreate: () => void
    onDelete: () => void
}

export const PageToolbar = ({
    search,
    searchPlaceholder,
    createLabel,
    onSearchChange,
    onCreate,
    onDelete,
}: PageToolbarProps) => {
    return (
        <div className={styles.container}>
            <Input
                className={styles.input}
                size="large"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <div className={styles.actions}>
                <IconButton icon={<CogIcon />} />
                <IconButton icon={<TrashSolidIcon />} onClick={onDelete} />
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
                {createLabel}
            </Button>
        </div>
    )
}
