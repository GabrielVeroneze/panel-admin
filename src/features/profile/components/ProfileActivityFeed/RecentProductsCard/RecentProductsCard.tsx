import { ShoppingBagIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { RecentProductItem } from './RecentProductItem/RecentProductItem'
import type { RecentProduct } from '@/features/profile/types'
import styles from './RecentProductsCard.module.scss'

type RecentProductsCardProps = {
    products: RecentProduct[]
}

export const RecentProductsCard = ({ products }: RecentProductsCardProps) => {
    return (
        <ProfileSectionCard
            icon={<ShoppingBagIcon />}
            title="Recently Managed Products"
        >
            <div className={styles.products}>
                {products.map((product) => (
                    <RecentProductItem key={product.id} {...product} />
                ))}
            </div>
        </ProfileSectionCard>
    )
}
