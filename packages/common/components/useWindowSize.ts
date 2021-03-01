import { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'

const useWindowSize = () => {
  const [{ width, height }, setSize] = useState<{
    width: number
    height: number
  }>({
    width: null,
    height: null,
  })

  useEffect(() => {
    const setSizeInner = () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })

    const handleWindowResize = throttle(setSizeInner, 300)
    setSizeInner()

    window.addEventListener('resize', handleWindowResize)
  }, [])

  return { width, height }
}

export default useWindowSize
