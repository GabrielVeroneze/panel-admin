import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/tests/setupTests.ts',
        coverage: {
            reporter: ['text', 'html'],
            exclude: ['src/tests/**', 'src/mocks/**', '**/*.d.ts'],
        },
    },
})
