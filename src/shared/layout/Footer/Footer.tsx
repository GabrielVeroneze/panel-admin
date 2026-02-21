import {
    DribbbleSolidIcon,
    FacebookFSolidIcon,
    GithubSolidIcon,
    TwitterSolidIcon,
} from '@/shared/icons'
import styles from './Footer.module.scss'

const socialLinks = [
    { name: 'Facebook', href: '#', Icon: FacebookFSolidIcon },
    { name: 'Twitter', href: '#', Icon: TwitterSolidIcon },
    { name: 'GitHub', href: '#', Icon: GithubSolidIcon },
    { name: 'Dribbble', href: '#', Icon: DribbbleSolidIcon },
]

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className={styles.footer}>
            <small className={styles.copy}>
                © {year} Gabriel Veroneze. Built for study purposes.
            </small>
            <nav className={styles.social} aria-label="Social media links">
                <ul className={styles.list}>
                    {socialLinks.map(({ name, href, Icon }) => (
                        <li key={name} className={styles.item}>
                            <a
                                className={styles.link}
                                href={href}
                                aria-label={name}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon />
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    )
}
