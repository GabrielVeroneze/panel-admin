import { EmptyState, UserInfo } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { formatCurrency } from '@/shared/utils'
import { LatestCustomersListSkeleton } from './LatestCustomersListSkeleton'
import type { LatestCustomer } from '@/features/dashboard/types'
import styles from './LatestCustomersList.module.scss'

type LatestCustomersProps = {
    customers?: LatestCustomer[]
    loading?: boolean
}

export const LatestCustomersList = ({
    customers,
    loading,
}: LatestCustomersProps) => {
    if (loading) return <LatestCustomersListSkeleton />

    if (!customers) {
        return (
            <EmptyState
                icon={<ExclamationCircleIcon />}
                title="No customers"
                description="No recent customers found."
            />
        )
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Latest Customers</h2>
            <ul className={styles.list}>
                {customers.map((customer) => (
                    <li key={customer.id} className={styles.item}>
                        <UserInfo
                            variant="sm"
                            name={customer.name}
                            email={customer.email}
                            avatarUrl={customer.image}
                        />
                        <span className={styles.value}>
                            {formatCurrency(customer.totalSpent)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
