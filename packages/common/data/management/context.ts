import { createContext } from 'react'
import { DataManagement } from './provider' // TODO think of a better way

const DataContext = createContext<DataManagement>(null)

export default DataContext
