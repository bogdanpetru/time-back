import { createContext } from 'react'
import { AddToast } from './types'

export const ToastContext = createContext<AddToast>(null)

export default ToastContext
