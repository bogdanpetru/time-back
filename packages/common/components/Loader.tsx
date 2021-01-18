import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import FullView from './FullView'

const LoaderWrapper = styled(FullView)`
  background: rgba(255, 255, 255, 0.8);
`

const LoaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95px;
`

interface BulletProps {
  active?: boolean
}

const Bullet = styled.div<BulletProps>`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: ${(props) => props?.theme?.loader?.background_color};
  transform: ${(props) => (props?.active ? 'scale(1.4)' : 'scale(1)')};
  transition: transform 250ms ease;
`

const rotate = (min: number, max: number, value: number): number => {
  if (value < min) {
    return min
  }
  if (value >= max) {
    return 0
  }
  return value
}

const Loader = () => {
  const numOfBullets = 4
  const [currentIndex, setIndex] = useState<number>(0)
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  })

  useEffect(() => {
    const nextIndex = rotate(0, numOfBullets, currentIndex + 1)
    setTimeout(() => {
      if (isMounted.current) {
        setIndex(nextIndex)
      }
    }, 300)
  }, [currentIndex])

  return (
    <LoaderWrapper>
      <LoaderInner>
        {[...Array(numOfBullets)].map((_, index) => (
          <Bullet key={index} active={index === currentIndex} />
        ))}
      </LoaderInner>
    </LoaderWrapper>
  )
}

export default Loader
