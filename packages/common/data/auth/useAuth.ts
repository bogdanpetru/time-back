import { useState, useEffect } from 'react'
import init, { AuthConfig } from './init'

function useAuth(config: AuthConfig) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      try {
        await init(config)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [init])

  return { loading, error }
}

export default useAuth
