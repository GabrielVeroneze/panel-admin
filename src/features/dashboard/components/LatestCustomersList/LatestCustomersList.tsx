import { UserInfo } from '@/shared/components'
import { formatCurrency } from '@/shared/utils'
import styles from './LatestCustomersList.module.scss'

const customers = [
    {
        id: 1,
        image: 'https://i.pravatar.cc/150?img=11',
        name: 'Ethan Walker',
        email: 'ethan.walker@example.com',
        totalSpent: 367,
    },
    {
        id: 2,
        image: 'https://i.pravatar.cc/150?img=12',
        name: 'Olivia Bennett',
        email: 'olivia.bennett@example.com',
        totalSpent: 67,
    },
    {
        id: 3,
        image: 'https://i.pravatar.cc/150?img=13',
        name: 'Noah Thompson',
        email: 'noah.thompson@example.com',
        totalSpent: 3467,
    },
    {
        id: 4,
        image: 'https://i.pravatar.cc/150?img=14',
        name: 'Ava Richardson',
        email: 'ava.richardson@example.com',
        totalSpent: 2367,
    },
    {
        id: 5,
        image: 'https://i.pravatar.cc/150?img=15',
        name: 'Liam Anderson',
        email: 'liam.anderson@example.com',
        totalSpent: 367,
    },
    {
        id: 6,
        image: 'https://i.pravatar.cc/150?img=16',
        name: 'Sophia Mitchell',
        email: 'sophia.mitchell@example.com',
        totalSpent: 1367,
    },
]

export const LatestCustomersList = () => {
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
