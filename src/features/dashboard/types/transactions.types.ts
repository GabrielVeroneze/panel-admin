export type TransactionStatus = 'completed' | 'cancelled' | 'inProgress'

export type Transaction = {
    id: number
    description: {
        text: string
        highlight: string
    }
    date: string
    amount: number
    status: TransactionStatus
}
