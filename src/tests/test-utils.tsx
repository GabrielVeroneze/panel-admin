import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, type RenderOptions } from '@testing-library/react'
import { store } from '@/store'
import type { ReactElement } from 'react'

type RouterOptions = {
    initialEntries?: string[]
}

type CustomRenderOptions = RenderOptions & RouterOptions

export const renderWithProviders = (
    ui: ReactElement,
    { initialEntries = ['/'], ...options }: CustomRenderOptions = {},
) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </Provider>,
        options,
    )
}
