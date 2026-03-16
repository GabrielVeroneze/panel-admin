import {
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/shared/components'
import { formatCurrency } from '@/shared/utils'
import { TransactionsTableSkeleton } from './TransactionsTableSkeleton'
import type { Transaction } from '@/features/dashboard/types'
import styles from './TransactionsTable.module.scss'

type TransactionsTableProps = {
    transactions?: Transaction[]
    loading?: boolean
}

const statusMap = {
    completed: {
        label: 'Completed',
        color: 'green',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'red',
    },
    inProgress: {
        label: 'In progress',
        color: 'blue',
    },
} as const

export const TransactionsTable = ({
    transactions,
    loading,
}: TransactionsTableProps) => {
    if (loading) return <TransactionsTableSkeleton />

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Transactions</h2>
                <p className={styles.text}>
                    This is a list of latest transactions.
                </p>
            </header>
            <div className={styles.tableContainer}>
                <Table striped>
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.transaction} header>
                                Transaction
                            </TableCell>
                            <TableCell className={styles.date} header>
                                Date & Time
                            </TableCell>
                            <TableCell className={styles.amount} header>
                                Amount
                            </TableCell>
                            <TableCell className={styles.status} header>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => {
                            const status = statusMap[transaction.status]

                            return (
                                <TableRow key={transaction.id}>
                                    <TableCell className={styles.transaction}>
                                        {transaction.description.text}{' '}
                                        <strong>
                                            {transaction.description.highlight}
                                        </strong>
                                    </TableCell>
                                    <TableCell className={styles.date}>
                                        {transaction.date}
                                    </TableCell>
                                    <TableCell className={styles.amount}>
                                        <strong>
                                            {formatCurrency(transaction.amount)}
                                        </strong>
                                    </TableCell>
                                    <TableCell className={styles.status}>
                                        <Badge size="sm" color={status.color}>
                                            {status.label}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
