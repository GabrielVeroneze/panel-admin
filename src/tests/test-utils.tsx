import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import type { TestStore } from './setupStore'

type RouterOptions = {
    initialEntries?: string[]
}

type CustomRenderOptions = RenderOptions & {
    store?: TestStore
} & RouterOptions

export const renderWithProviders = (
    ui: ReactElement,
    { initialEntries = ['/'], store, ...options }: CustomRenderOptions = {},
) => {
    const content = (
        <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    )

    return store
        ? render(<Provider store={store}>{content}</Provider>, options)
        : render(content, options)
}
