import type { FC, SVGProps } from 'react'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

const modules = import.meta.glob('./**/*.svg', {
    query: '?react',
    import: 'default',
    eager: true,
})

export const softwareIcons = Object.entries(modules).reduce(
    (acc, [path, component]) => {
        const name = path.split('/').pop()?.replace('.svg', '')

        if (name) {
            acc[name] = component as SvgComponent
        }

        return acc
    },
    {} as Record<string, SvgComponent>,
)
