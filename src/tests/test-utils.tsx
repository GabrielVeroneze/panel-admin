import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, type RenderOptions } from '@testing-library/react'
import { store } from '@/store'
import type { ReactElement } from 'react'

export const renderWithProviders = (
    ui: ReactElement,
    options?: RenderOptions,
) => {
    return render(
        <Provider store={store}>
            <MemoryRouter>{ui}</MemoryRouter>
        </Provider>,
        options,
    )
}
