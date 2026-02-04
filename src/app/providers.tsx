import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/app/store'
import type { ReactNode } from 'react'

type ProvidersProps = {
    children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>
}
