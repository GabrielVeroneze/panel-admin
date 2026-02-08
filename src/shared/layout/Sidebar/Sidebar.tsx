import { NavItemExpandable, NavItem } from '@/shared/components'
import {
    ChartPieSolidIcon,
    DocumentReportSolidIcon,
    LockClosedSolidIcon,
    ShoppingBagSolidIcon,
} from '@/shared/icons'
import styles from './Sidebar.module.scss'

type SidebarProps = {
    isOpen: boolean
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
    return (
        <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <ul className={styles.menu}>
                <NavItem
                    className={styles.menuItem}
                    icon={<ChartPieSolidIcon />}
                    to="#"
                    label="Overview"
                />
                <NavItemExpandable
                    icon={<DocumentReportSolidIcon />}
                    label="Pages"
                >
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Users"
                    />
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Profile"
                    />
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Settings"
                    />
                </NavItemExpandable>
                <NavItemExpandable
                    icon={<ShoppingBagSolidIcon />}
                    label="Sales"
                >
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Product List"
                    />
                </NavItemExpandable>
                <NavItemExpandable
                    icon={<LockClosedSolidIcon />}
                    label="Authentication"
                >
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Sign In"
                    />
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Sign Up"
                    />
                    <NavItem
                        className={styles.submenuItem}
                        to="#"
                        label="Forgot Password"
                    />
                </NavItemExpandable>
            </ul>
        </nav>
    )
}
