import { Outlet } from 'react-router'
import styles from './AuthLayout.module.scss'

export const AuthLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}
