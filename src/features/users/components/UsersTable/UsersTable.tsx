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
import styles from './UsersTable.module.scss'

const users = [
    {
        id: 1,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 2,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 3,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 4,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 5,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 6,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 7,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 8,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 9,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 10,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 11,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 12,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 13,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
    {
        id: 14,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'offline',
    },
    {
        id: 15,
        image: 'https://i.pravatar.cc/150?img=68',
        name: 'Neil Sims',
        email: 'bonnie@example.com',
        position: 'Front End Developer',
        country: 'United States',
        status: 'active',
    },
]

export const UsersTable = () => {
    return (
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
    )
}
