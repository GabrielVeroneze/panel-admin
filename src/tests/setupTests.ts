import '@testing-library/jest-dom/vitest'
import { afterEach, beforeAll, afterAll } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from '@/mocks/server'

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })

    if (!HTMLDialogElement.prototype.showModal) {
        HTMLDialogElement.prototype.showModal = function () {
            this.setAttribute('open', '')
        }
    }

    if (!HTMLDialogElement.prototype.close) {
        HTMLDialogElement.prototype.close = function () {
            this.removeAttribute('open')
        }
    }
})

afterEach(() => {
    cleanup()
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})
