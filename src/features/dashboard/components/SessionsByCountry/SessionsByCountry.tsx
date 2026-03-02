import styles from './SessionsByCountry.module.scss'

export const SessionsByCountry = () => {

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Sessions by Country</h2>
                <strong className={styles.value}>United States</strong>
            </header>
            <div className={styles.mapContainer}>
            </div>
            <div className={styles.chartContainer}>
            </div>
        </div>
    )
}
