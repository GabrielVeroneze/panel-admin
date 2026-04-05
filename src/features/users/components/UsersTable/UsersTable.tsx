import {
    Button,
    Checkbox,
    EmptyState,
    StatusBadge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    UserInfo,
} from '@/shared/components'
import {
    ExclamationCircleIcon,
    PencilAltSolidIcon,
} from '@/shared/assets/icons'
import { UsersTableSkeleton } from './UsersTableSkeleton'
import type { UserListItem } from '@/features/users/types'
import styles from './UsersTable.module.scss'

type UsersTableProps = {
    users: UserListItem[]
    loading: boolean
    onEdit: (userId: number) => void
}

export const UsersTable = ({ users, loading, onEdit }: UsersTableProps) => {
    const isEmpty = !users || users.length === 0

    if (loading) return <UsersTableSkeleton />

    if (isEmpty) {
        return (
            <EmptyState
                icon={<ExclamationCircleIcon />}
                title="No users"
                description="There are no users to display."
            />
        )
    }

    return (
        <div className={styles.wrapper}>
            <Table borderedRows className={styles.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={styles.checkbox} size="lg" header>
                            <Checkbox />
                        </TableCell>
                        <TableCell className={styles.name} size="lg" header>
                            Name
                        </TableCell>
                        <TableCell className={styles.position} size="lg" header>
                            Position
                        </TableCell>
                        <TableCell className={styles.country} size="lg" header>
                            Country
                        </TableCell>
                        <TableCell className={styles.status} size="lg" header>
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} size="lg">
                            <TableCell className={styles.checkbox} size="lg">
                                <Checkbox />
                            </TableCell>
                            <TableCell className={styles.name} size="lg">
                                <UserInfo
                                    variant="md"
                                    avatarUrl={user.image}
                                    name={user.name}
                                    email={user.email}
                                />
                            </TableCell>
                            <TableCell className={styles.position} size="lg">
                                {user.position}
                            </TableCell>
                            <TableCell className={styles.country} size="lg">
                                {user.country}
                            </TableCell>
                            <TableCell className={styles.status} size="lg">
                                <StatusBadge status={user.status} />
                            </TableCell>
                            <TableCell className={styles.actions} size="lg">
                                <Button
                                    size="md"
                                    variant="primary"
                                    iconPosition="left"
                                    icon={<PencilAltSolidIcon />}
                                    onClick={() => onEdit(user.id)}
                                >
                                    Edit Item
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
