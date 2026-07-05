import { Provider as ReduxProvider } from 'react-redux'
import { Toaster } from 'sonner'
import { store } from '@/store'
import type { ReactNode } from 'react'

type ProvidersProps = {
    children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <ReduxProvider store={store}>
            <Toaster />
            {children}
        </ReduxProvider>
    )
}
