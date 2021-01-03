import { createContext } from 'react'
import { DataManagement } from './interface'

const DataContext = createContext<DataManagement>(null)

export default DataContext
