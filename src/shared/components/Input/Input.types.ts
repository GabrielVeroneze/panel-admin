import type { ComponentProps } from 'react'

export type NativeInputProps = Omit<ComponentProps<'input'>, 'size'>
