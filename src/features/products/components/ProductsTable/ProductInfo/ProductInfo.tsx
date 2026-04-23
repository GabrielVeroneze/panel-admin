import styles from './ProductInfo.module.scss'

type ProductInfoProps = {
    name: string
    imageUrl: string
}

export const ProductInfo = ({ name, imageUrl }: ProductInfoProps) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={imageUrl} alt={name} />
            <div className={styles.text}>
                <span className={styles.name}>{name}</span>
            </div>
        </div>
    )
}
