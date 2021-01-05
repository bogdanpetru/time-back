import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { requestNotificationPermission } from '@app/services/notification'

requestNotificationPermission()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
