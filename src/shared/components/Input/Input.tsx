import type { ComponentProps } from 'react'
import styles from './Input.module.scss'

type InputProps = ComponentProps<'input'>

export const Input = (props: InputProps) => {
    return <input className={styles.input} {...props} />
}
