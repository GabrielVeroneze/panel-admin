import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@/shared/components'
import { CreateProductForm } from '@/features/products/components'
import type { CreateProductFormValues } from '@/features/products/schemas'
import styles from '@/styles/modules/modal.module.scss'

type CreateProductModalProps = {
    open: boolean
    loading: boolean
    error: string | null
    onCreate: (data: CreateProductFormValues) => Promise<void>
    onClose: () => void
}

export const CreateProductModal = ({
    open,
    loading,
    error,
    onCreate,
    onClose,
}: CreateProductModalProps) => {
    const formId = 'product-form'

    const handleClose = () => {
        if (loading) return

        onClose()
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalHeader title="Create product" onClose={handleClose} />
            <ModalContent>
                <CreateProductForm
                    formId={formId}
                    error={error}
                    onSubmit={onCreate}
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
                    onClick={handleClose}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
