import { UsersFooter, UsersTable, UsersToolbar } from './components'
import styles from './UsersPage.module.scss'

export const UsersPage = () => {
    return (
        <section className={styles.users}>
            <UsersToolbar />
            <UsersTable />
            <UsersFooter />
        </section>
    )
}
