import { createContext } from 'react'
import { AddToast } from './types'

const ToastContext = createContext<AddToast>(null)

export default ToastContext
