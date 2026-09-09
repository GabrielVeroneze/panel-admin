import { Button, IconButton, Input } from '@/shared/components'
import {
    CogIcon,
    DotsVerticalSolidIcon,
    ExclamationCircleSolidIcon,
    TrashSolidIcon,
    UserAddSolidIcon,
} from '@/shared/assets/icons'
import styles from './DataTableToolbar.module.scss'

type DataTableToolbarProps = {
    search: string
    searchPlaceholder: string
    createLabel: string
    hasSelection: boolean
    onSearchChange: (value: string) => void
    onCreate: () => void
    onDelete: () => void
}

export const DataTableToolbar = ({
    search,
    searchPlaceholder,
    createLabel,
    hasSelection,
    onSearchChange,
    onCreate,
    onDelete,
}: DataTableToolbarProps) => {
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
                <IconButton icon={<CogIcon />} aria-label="Table settings" />
                <IconButton
                    icon={<TrashSolidIcon />}
                    aria-label="Delete selected users"
                    onClick={onDelete}
                    disabled={!hasSelection}
                />
                <IconButton
                    icon={<ExclamationCircleSolidIcon />}
                    aria-label="Table information"
                />
                <IconButton
                    icon={<DotsVerticalSolidIcon />}
                    aria-label="More table actions"
                />
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
