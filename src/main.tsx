import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { AppInitializer, Providers } from '@/app'
import { router } from '@/routes'
import '@/styles/global.scss'

const enableMocking = async () => {
    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser')

        return worker.start({
            onUnhandledRequest: 'bypass',
        })
    }
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Providers>
                <AppInitializer>
                    <RouterProvider router={router} />
                </AppInitializer>
            </Providers>
        </StrictMode>,
    )
})
