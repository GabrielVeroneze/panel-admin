import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { XSolidIcon } from '@/shared/assets/icons'
import { EditProductForm } from '@/features/products/components'
import type { Product } from '@/features/products/types'
import type { UpdateProductFormValues } from '@/features/products/schemas'
import styles from '@/styles/modules/modal.module.scss'

type EditProductModalProps = {
    open: boolean
    product?: Product | null
    loading: boolean
    error: string | null
    onUpdate: (data: UpdateProductFormValues) => Promise<void>
    onClose: () => void
    onDelete?: () => void
}

export const EditProductModal = ({
    open,
    product,
    loading,
    error,
    onUpdate,
    onClose,
    onDelete,
}: EditProductModalProps) => {
    const formId = 'product-form'

    const handleClose = () => {
        if (loading) return

        onClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalHeader title="Edit product" onClose={handleClose} />
            <ModalContent>
                <EditProductForm
                    formId={formId}
                    product={product}
                    error={error}
                    onSubmit={onUpdate}
                />
            </ModalContent>
            <ModalFooter>
                <Button
                    className={styles.button}
                    form={formId}
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    disabled={loading}
                >
                    Save
                </Button>
                <Button
                    className={styles.button}
                    variant="danger"
                    size="lg"
                    iconPosition="left"
                    icon={<XSolidIcon />}
                    onClick={onDelete}
                    disabled={loading}
                >
                    Delete product
                </Button>
            </ModalFooter>
        </Modal>
    )
}
