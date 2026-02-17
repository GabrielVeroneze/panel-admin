import type { ComponentProps } from 'react'

type TableBodyProps = ComponentProps<'tbody'>

export const TableBody = ({ children, ...props }: TableBodyProps) => {
    return <tbody {...props}>{children}</tbody>
}
