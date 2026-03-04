import {
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/shared/components'
import styles from './TransactionsTable.module.scss'

type TransactionStatus = 'completed' | 'cancelled' | 'inProgress'

type Transaction = {
    id: string
    description: string
    date: string
    amount: string
    status: TransactionStatus
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

const data: Transaction[] = [
    {
        id: '1',
        description: 'Payment from Bonnie Green',
        date: 'Apr 23, 2021',
        amount: '$2300',
        status: 'completed',
    },
    {
        id: '2',
        description: 'Payment refund to #00910',
        date: 'Apr 23, 2021',
        amount: '-$670',
        status: 'completed',
    },
    {
        id: '3',
        description: 'Payment failed from #087651',
        date: 'Apr 18, 2021',
        amount: '$234',
        status: 'cancelled',
    },
    {
        id: '4',
        description: 'Payment from Bonnie Green',
        date: 'Apr 15, 2021',
        amount: '$5000',
        status: 'inProgress',
    },
    {
        id: '5',
        description: 'Payment from Jese Leos',
        date: 'Apr 15, 2021',
        amount: '$2300',
        status: 'completed',
    },
    {
        id: '6',
        description: 'Payment from THEMBERG LLC',
        date: 'Apr 11, 2021',
        amount: '$280',
        status: 'completed',
    },
]

export const TransactionsTable = () => {
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
                            <TableCell header>Transaction</TableCell>
                            <TableCell header>Date & Time</TableCell>
                            <TableCell header>Amount</TableCell>
                            <TableCell header>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((transaction) => {
                            const status = statusMap[transaction.status]

                            return (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>
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
