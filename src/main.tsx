import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Providers } from '@/app/providers'
import { RouterProvider } from 'react-router'
import { router } from '@/routes'
import '@/styles/global.scss'

const enableMocking = async () => {
    if (import.meta.env.DEV) {
        const { worker } = await import('./mocks/browser')

        return worker.start()
    }
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Providers>
                <RouterProvider router={router} />
            </Providers>
        </StrictMode>,
    )
})
