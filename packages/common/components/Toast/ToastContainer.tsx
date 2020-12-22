import { useState, FunctionComponent } from 'react'
import Toast from './Toast'
import ToastContext from './ToastContext'
import { AddToast } from './types'

export interface ToastInterface {
  children: React.ReactElement
  id: string
}

let toastID = 1

interface ToastContainerProps {
  defaultExpireTime?: number
}

const ToastContainer: FunctionComponent<ToastContainerProps> = (props) => {
  const [toasts, setToasts] = useState<ToastInterface[]>([])

  const handleAddToast: AddToast = ({
    children,
    expireTime = props.defaultExpireTime,
  }) => {
    const id = `toast-${toastID}`
    toastID += 1
    const toast = {
      children,
      id,
    }

    setToasts([...toasts, toast])

    const close = () => {
      setToasts(toasts.filter((toastItem) => toastItem !== toast))
    }

    if (expireTime) {
      setTimeout(close, expireTime)
    }

    return {
      close,
    }
  }

  return (
    <ToastContext.Provider value={handleAddToast}>
      {toasts.map((toastItem) => (
        <Toast key={toastItem.id}>{toastItem.children}</Toast>
      ))}
      {props.children}
    </ToastContext.Provider>
  )
}

export default ToastContainer
