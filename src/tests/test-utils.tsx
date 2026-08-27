import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, type RenderOptions } from '@testing-library/react'
import { setupStore, type TestStore } from './setupStore'
import type { ReactElement } from 'react'

type RouterOptions = {
    initialEntries?: string[]
}

type CustomRenderOptions = RenderOptions & {
    store?: TestStore
} & RouterOptions

export const renderWithProviders = (
    ui: ReactElement,
    {
        initialEntries = ['/'],
        store = setupStore(),
        ...options
    }: CustomRenderOptions = {},
) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </Provider>,
        options,
    )
}
