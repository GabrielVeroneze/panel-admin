import {
    Button,
    Checkbox,
    StatusBadge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    UserInfo,
} from '@/shared/components'
import { PencilAltSolidIcon } from '@/shared/assets/icons'
import { UsersTableSkeleton } from './UsersTableSkeleton'
import type { User } from '@/features/users/types'
import styles from './UsersTable.module.scss'

type UsersTableProps = {
    users: User[]
    loading: boolean
}

export const UsersTable = ({ users, loading }: UsersTableProps) => {
    const isEmpty = !users || users.length === 0

    if (loading) return <UsersTableSkeleton />

    if (isEmpty) return <span>Empty</span>

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
