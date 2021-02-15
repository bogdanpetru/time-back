import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { requestNotificationPermission } from '@app/services/notification'
import { register as registerServiceWorker } from './sw/register'

requestNotificationPermission()
registerServiceWorker()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
