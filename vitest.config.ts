import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            globals: true,
            setupFiles: './src/tests/setupTests.ts',
            coverage: {
                reporter: ['text', 'html'],
                exclude: ['src/tests/**', 'src/mocks/**', '**/*.d.ts'],
            },
            css: {
                modules: {
                    classNameStrategy: 'non-scoped',
                },
            },
        },
    }),
)
