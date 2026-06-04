import { Card, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon, ShoppingBagIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { RecentProductItem } from './RecentProductItem/RecentProductItem'
import type { RecentProduct } from '@/features/profile/types'
import styles from './RecentProductsCard.module.scss'

type RecentProductsCardProps = {
    products: RecentProduct[]
}

export const RecentProductsCard = ({ products }: RecentProductsCardProps) => {
    if (!products || products.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Product activity unavailable"
                    description="Recently managed products could not be loaded."
                />
            </Card>
        )
    }

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
